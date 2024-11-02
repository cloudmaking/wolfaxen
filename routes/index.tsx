import { Head } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export default function Home() {
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLDivElement>(
      ".slide-bg-1, .slide-bg-2, .slide-bg-3",
    );
    const prevButton = document.getElementById(
      "prevButton",
    ) as HTMLButtonElement;
    const nextButton = document.getElementById(
      "nextButton",
    ) as HTMLButtonElement;
    let currentSlide = 0;

    function goToSlide(slideIndex: number) {
      slides.forEach((slide, index) => {
        slide.classList.toggle("hidden", index !== slideIndex);
      });
      currentSlide = slideIndex;
    }

    goToSlide(0);

    const handlePrevClick = () => {
      goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1);
    };

    const handleNextClick = () => {
      goToSlide((currentSlide + 1) % slides.length);
    };

    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);

    const autoScrollInterval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(autoScrollInterval);
      prevButton.removeEventListener("click", handlePrevClick);
      nextButton.removeEventListener("click", handleNextClick);
    };
  }, []);

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
          {/* Slider Controls */}
          <div class="absolute inset-x-0 bottom-10 md:bottom-20 flex justify-between px-4 md:px-8 z-20">
            <button
              id="prevButton"
              class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400"
            >
              &#10094;
            </button>
            <button
              id="nextButton"
              class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400"
            >
              &#10095;
            </button>
          </div>

          {/* Slides */}
          <div class="absolute inset-0 z-0">
            {/* Slide 1 Content and Background */}
            <div
              class="slide-bg-1 w-full h-full bg-cover bg-center z-10 flex items-center justify-center"
              style="background-image: url('/static/scbg33.jpg');"
            >
              <div class="text-center max-w-2xl mx-auto">
                <p class="text-4xl md:text-7xl lg:text-9xl font-light leading-none text-shadow">
                  Internal Audits
                </p>
                <p class="mt-4 text-xl md:text-2xl text-shadow">
                  Streamline your workflows and enhance productivity.
                </p>
                <br />
                <br />
                <a
                  href="/contactus"
                  class="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Slide 2 Content and Background */}
            <div
              class="slide-bg-2 w-full h-full bg-cover bg-center z-10 hidden flex items-center justify-center"
              style="background-image: url('/static/scbg13.png');"
            >
              <div class="text-center max-w-2xl mx-auto">
                <p class="text-4xl md:text-7xl lg:text-9xl font-light leading-none text-shadow">
                  Streamline<br />Operations
                </p>
                <p class="mt-4 text-xl md:text-2xl text-shadow">
                  Automate your processes and reduce manual errors.
                </p>
                <br />
                <br />
                <a
                  href="/contactus"
                  class="mt-8 bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Slide 3 Content and Background */}
            <div
              class="slide-bg-3 w-full h-full bg-cover bg-center z-10 hidden flex items-center justify-center"
              style="background-image: url('/static/slide3.jpg');"
            >
              <div class="text-center max-w-2xl mx-auto">
                <p class="text-4xl md:text-7xl lg:text-9xl font-light leading-none text-shadow">
                  Enhance<br />Collaboration
                </p>
                <p class="mt-4 text-xl md:text-2xl text-shadow">
                  Connect your teams and improve communication.
                </p>
                <br />
                <br />
                <a
                  href="/contactus"
                  class="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
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
