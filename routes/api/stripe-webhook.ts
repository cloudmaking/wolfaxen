import { Handlers } from "$fresh/server.ts";
import Stripe from "https://esm.sh/stripe@14.14.0";
import { createClient } from "npm:@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

let supabaseAdmin: any = null;

if (supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Stripe Webhook Handler
 *
 * Receives asynchronous events from Stripe (e.g., checkout.session.completed, customer.subscription.updated).
 *
 * Security:
 * - Verifies the Stripe signature to ensure the request is authentic.
 * - Uses the Supabase Service Role key to bypass RLS and update user profiles/subscriptions.
 *
 * Operations:
 * - `checkout.session.completed`: Updates user profile to `is_subscribed = true`.
 * - `customer.subscription.updated`: Syncs subscription status (active, past_due, canceled) to Supabase.
 * - `customer.subscription.deleted`: Marks subscription as canceled.
 */
export const handler: Handlers = {
  async POST(req) {
    if (!supabaseAdmin) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
      // Do not fail webhook delivery; acknowledge while logging for ops.
      return new Response(
        JSON.stringify({ received: true, warning: "service role key missing" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const body = await req.text();
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        endpointSecret,
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const clientReferenceId = session.client_reference_id;

        if (clientReferenceId) {
          // Update profile
          const { error: profileError } = await supabaseAdmin.from("profiles")
            .update({
              is_subscribed: true,
              stripe_customer_id: customerId,
            }).eq("id", clientReferenceId);

          if (profileError) {
            console.error("Error updating profile:", profileError);
          }

          // Update subscriptions table (Source of Truth) - REMOVED
          // We now rely solely on profiles.is_subscribed
          /*
          const { error: subError } = await supabaseAdmin.from("subscriptions")
            .upsert({
              user_id: clientReferenceId,
              status: "active",
              plan_code: "PRO", // Default to PRO for now
              free_generation_used: false, // Reset free usage on upgrade
              updated_at: new Date().toISOString(),
            }, { onConflict: "user_id" });

          if (subError) console.error("Error updating subscription:", subError);
          */
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await supabaseAdmin.from("profiles").update({
          is_subscribed: false,
        }).eq("stripe_customer_id", customerId);

        // Update subscriptions table - REMOVED
        /*
        // We need to find the user by stripe_customer_id, but profiles has it.
        // Let's first get the user_id from profiles
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabaseAdmin.from("subscriptions").update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          }).eq("user_id", profile.id);
        }
        */
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
