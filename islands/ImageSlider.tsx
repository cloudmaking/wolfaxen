import { useEffect, useState } from "preact/hooks";

export default function ImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handlePrevClick = () => {
        setCurrentSlide((prev) => (prev - 1 + 3) % 3);
    };

    const handleNextClick = () => {
        setCurrentSlide((prev) => (prev + 1) % 3);
    };

    return (
        <div class="flex-grow relative">
            {/* Slider Controls */}
            <div class="absolute inset-x-0 bottom-10 md:bottom-20 flex justify-between px-4 md:px-8 z-20">
                <button
                    onClick={handlePrevClick}
                    class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400"
                >
                    &#10094;
                </button>
                <button
                    onClick={handleNextClick}
                    class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400"
                >
                    &#10095;
                </button>
            </div>

            {/* Slides */}
            <div class="absolute inset-0 z-0">
                {/* Slide 1 */}
                <div
                    class={`slide-bg-1 w-full h-full bg-cover bg-center z-10 items-center justify-center ${
                        currentSlide === 0 ? "flex" : "hidden"
                    }`}
                    style="background-image: url('/scbg33.jpg');"
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

                {/* Slide 2 */}
                <div
                    class={`slide-bg-2 w-full h-full bg-cover bg-center z-10 items-center justify-center ${
                        currentSlide === 1 ? "flex" : "hidden"
                    }`}
                    style="background-image: url('/scbg13.png');"
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

                {/* Slide 3 */}
                <div
                    class={`slide-bg-3 w-full h-full bg-cover bg-center z-10 items-center justify-center ${
                        currentSlide === 2 ? "flex" : "hidden"
                    }`}
                    style="background-image: url('/slide3.jpg');"
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
        </div>
    );
}
