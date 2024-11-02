import { Head } from "$fresh/runtime.ts";
import ImageSlider from "../islands/ImageSlider.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>NexaFlow | Wolfaxen - Streamline Your Operations</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body class="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header class="bg-opacity-80 bg-black text-center py-3">
          <h1 class="text-2xl font-bold uppercase">NexaFlow | Wolfaxen</h1>
        </header>

        {/* Main Content with Slider */}
        <main class="flex-grow relative">
          <ImageSlider />
        </main>

        {/* Footer */}
        <footer class="bg-opacity-80 bg-black text-center py-1">
          &copy; 2023 NexaFlow | Wolfaxen. Empowering Organizations for a Better
          Tomorrow.
        </footer>
      </body>
    </>
  );
}
