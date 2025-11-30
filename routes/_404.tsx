import { Head } from "$fresh/runtime.ts";
import AnimatedButton from "../islands/AnimatedButton.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found | Wolfaxen</title>
      </Head>
      <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 class="text-6xl md:text-9xl font-display font-bold text-muted-gold mb-4">
          404
        </h1>
        <h2 class="text-2xl md:text-4xl font-bold text-warm-beige mb-6">
          Page not found
        </h2>
        <p class="text-lg text-warm-beige/70 mb-10 max-w-md">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <AnimatedButton href="/" variant="primary">
          Go back home
        </AnimatedButton>
      </div>
    </>
  );
}
