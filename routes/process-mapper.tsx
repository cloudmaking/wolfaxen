import { Head } from "$fresh/runtime.ts";

export default function ProcessMapperComingSoon() {
  return (
    <>
      <Head>
        <title>Process Mapper - Coming Soon</title>
      </Head>
      <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4 text-warm-beige">
            Process Mapper
          </h1>
          <p class="text-xl text-gray-400 mb-8">
            This feature is currently under development. Check back soon!
          </p>
          <a
            href="/dashboard"
            class="inline-block px-6 py-3 bg-muted-gold text-oreo-black font-bold rounded-lg hover:bg-light-gold transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </>
  );
}
