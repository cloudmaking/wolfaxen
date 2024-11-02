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

    // Define slides with fallback backgrounds
    const slides = [
        {
            bgImage: "scbg33.jpg",
            title: "Internal Audits",
            subtitle: "Streamline your workflows and enhance productivity.",
            buttonColor: "blue",
        },
        {
            bgImage: "scbg13.png",
            title: "Streamline\nOperations",
            subtitle: "Automate your processes and reduce manual errors.",
            buttonColor: "red",
        },
        {
            bgImage: "slide3.jpg",
            title: "Enhance\nCollaboration",
            subtitle: "Connect your teams and improve communication.",
            buttonColor: "blue",
        },
    ];

    return (
        <div class="flex-grow relative min-h-screen">
            {/* Slider Controls */}
            <div class="absolute inset-x-0 bottom-10 md:bottom-20 flex justify-between px-4 md:px-8 z-20">
                <button
                    onClick={handlePrevClick}
                    class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400 bg-white/10 p-2 rounded-full"
                >
                    &#10094;
                </button>
                <button
                    onClick={handleNextClick}
                    class="text-2xl md:text-3xl lg:text-4xl text-blue-500 hover:text-blue-400 bg-white/10 p-2 rounded-full"
                >
                    &#10095;
                </button>
            </div>

            {/* Slides */}
            <div class="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        class={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ${
                            currentSlide === index
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                        }`}
                        style={{
                            backgroundImage:
                                `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/${slide.bgImage}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div class="text-center max-w-2xl mx-auto px-4">
                            <h2 class="text-4xl md:text-7xl lg:text-9xl font-light leading-none text-white mb-6 whitespace-pre-line">
                                {slide.title}
                            </h2>
                            <p class="mt-4 text-xl md:text-2xl text-white mb-8">
                                {slide.subtitle}
                            </p>
                            <a
                                href="/contactus"
                                class={`mt-8 bg-${slide.buttonColor}-500 text-white py-3 px-6 rounded-lg hover:bg-${slide.buttonColor}-600 transition duration-300 inline-block`}
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
