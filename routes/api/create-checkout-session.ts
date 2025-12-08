import { Handlers } from "$fresh/server.ts";
import Stripe from "https://esm.sh/stripe@14.14.0";
import { State } from "../../middleware/auth.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

export const handler: Handlers<any, State> = {
  async POST(req, ctx) {
    const session = ctx.state.session;
    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = session.user;

    const priceId = Deno.env.get("STRIPE_PRICE_ID");
    if (!priceId) {
      return new Response("Server config error: Missing Price ID", {
        status: 500,
      });
    }

    const { origin } = new URL(req.url);

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${origin}/process-mapper?success=true`,
        cancel_url: `${origin}/process-mapper?canceled=true`,
        client_reference_id: user.id,
        customer_email: user.email,
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error(e);
      return new Response("Checkout creation failed", { status: 500 });
    }
  },
};
