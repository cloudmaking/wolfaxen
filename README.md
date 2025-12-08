# Wolfaxen - AI-Powered Process Automation Platform

Wolfaxen is a high-performance web application built to help businesses automate
workflows using AI. It features a Process Mapper tool that generates visual
process diagrams and actionable insights from natural language descriptions.

## 🛠 Tech Stack

- **Runtime**: [Deno](https://deno.land/) (Secure, modern JavaScript/TypeScript
  runtime)
- **Framework**: [Fresh](https://fresh.deno.dev/) (Next-gen web framework, zero
  runtime overhead)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime)
- **AI**: [Google Gemini](https://deepmind.google/technologies/gemini/)
  (Generative AI for process analysis)
- **Payments**: [Stripe](https://stripe.com/) (Subscription management)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)

## 🏗 Architecture

The project follows the **Island Architecture** pattern provided by Fresh:

- **`routes/`**: Server-side rendered pages and API endpoints.
  - `routes/api/`: JSON API endpoints for the frontend and external webhooks.
  - `routes/islands/`: Interactive client-side components (hydrated in the
    browser).
- **`middleware/`**: Request interception for authentication and access control.
- **`utils/`**: Shared utility functions and database clients.

### Key Components

1. **Process Mapper (`islands/ProcessMapperWrapper.tsx`)**:
   - The core tool. It manages the state of the process map (nodes, edges) and
     handles user interactions.
   - Communicates with `/api/process-mapper/*` endpoints to generate, update,
     and revert maps.

2. **Authentication (`middleware/auth.ts`)**:
   - **Per-Request Client**: A unique Supabase client is created for every
     request to ensure strict data isolation.
   - **Session Management**: Uses secure, HTTP-only cookies
     (`supa_access_token`, `supa_refresh_token`) to persist sessions.
   - **Context**: The authenticated user session and client are passed to routes
     via `ctx.state`.

3. **AI Integration (`routes/api/generate-map.ts`)**:
   - Uses Google's Gemini 1.5 Flash model to parse natural language into
     structured graph data (JSON).
   - Generates insights (bottlenecks, automation opportunities) based on the
     process flow.

## 🔐 Security Model

- **Row Level Security (RLS)**: All database access is governed by Supabase RLS
  policies. Users can only access their own data.
- **Service Role Isolation**: The `SUPABASE_SERVICE_ROLE_KEY` is ONLY used in
  specific, privileged contexts (e.g., Stripe Webhooks) and is never exposed to
  the client.
- **Cookie Security**: Auth cookies are set with `Secure`, `HttpOnly`, and
  `SameSite=Lax` attributes.
- **Input Validation**: API endpoints validate input size (e.g., prompt length,
  audio file size) to prevent abuse.

## 🚀 Key Workflows

### 1. User Authentication

- **Login**: Magic Link via Supabase Auth (`/login`).
- **Session**: Tokens are stored in cookies. Middleware validates tokens on
  every protected route.

### 2. Process Generation

- User inputs a description -> `POST /api/generate-map` -> Gemini API -> Returns
  Graph JSON -> Frontend renders interactive map.

### 3. Subscription (Stripe)

- User clicks "Upgrade" -> `POST /api/create-checkout-session` -> Stripe
  Checkout.
- Payment Success -> Stripe Webhook (`/api/stripe-webhook`) -> Updates
  `profiles` and `subscriptions` tables in Supabase using the Service Role.

## 💻 Setup & Development

1. **Install Deno**:
   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. **Environment Variables**: Create a `.env` file with the following:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GEMINI_API_KEY=your_gemini_key
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   STRIPE_PRICE_ID=your_price_id
   ```

3. **Start the Server**:
   ```bash
   deno task start
   ```

## 🧪 Testing

Run the test suite:

```bash
deno test -A
```
