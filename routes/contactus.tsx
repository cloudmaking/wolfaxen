import { Head } from "$fresh/runtime.ts";

export default function ContactUs() {
    return (
        <>
            <Head>
                <title>Contact Us - NexaFlow | Wolfaxen</title>
                <script src="https://cdn.tailwindcss.com"></script>
                {/* Optional Tailwind CSS Configuration */}
                <script>
                    {`tailwind.config = {
            theme: {
              extend: {
                colors: {
                  // Add custom colors if needed
                },
              },
            },
          }`}
                </script>
            </Head>
            <body class="bg-gray-100 font-sans leading-relaxed text-gray-800">
                {/* Header */}
                <header class="bg-white shadow-md">
                    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
                        <a
                            href="/"
                            class="text-2xl font-bold text-gray-800 hover:text-gray-700"
                        >
                            NexaFlow | Wolfaxen
                        </a>
                        <nav class="flex space-x-4">
                            <a
                                href="/"
                                class="text-gray-800 hover:text-blue-600"
                            >
                                Home
                            </a>
                            <a
                                href="/contactus"
                                class="text-blue-600 font-semibold"
                            >
                                Contact Us
                            </a>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main class="container mx-auto px-6 py-16">
                    <div class="flex flex-col items-center">
                        <h2 class="text-3xl font-semibold text-gray-800 mb-6">
                            Get in Touch
                        </h2>
                        <p class="text-gray-600 mb-8 text-center max-w-2xl">
                            We'd love to hear from you! Please reach out to us
                            using the contact information below.
                        </p>
                        <div class="space-y-4 text-center">
                            <p class="flex items-center justify-center">
                                <svg
                                    class="w-6 h-6 text-blue-600 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 8V7l-3 2-2-1-7 5v6h9v-5l4-4zm-5 8h-5v-2l7-5v2l-2 1v4z" />
                                    <path d="M5 6h4v2H5zm0 4h4v2H5zm0 4h4v2H5z" />
                                </svg>
                                Email:&nbsp;
                                <a
                                    href="mailto:info@wolfaxen.com"
                                    class="text-blue-600"
                                >
                                    info@wolfaxen.com
                                </a>
                            </p>
                            <p class="flex items-center justify-center">
                                <svg
                                    class="w-6 h-6 text-blue-600 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20l4-4h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                </svg>
                                Phone:&nbsp;
                                <span class="text-gray-800">
                                    +44 7519 244960
                                </span>
                            </p>
                            <p class="flex items-center justify-center">
                                <svg
                                    class="w-6 h-6 text-blue-600 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                                </svg>
                                Address:&nbsp;
                                <span class="text-gray-800">London, UK</span>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Map Section */}
                <section class="bg-gray-200 py-12">
                    <div class="container mx-auto px-6">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Our Location
                        </h2>
                        <div class="flex items-center justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19804.060085665365!2d-0.1277588!3d51.5073506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b333c34b0d9%3A0x8d94c4b7f59c5b30!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1635555696549!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style="border:0;"
                                allowFullScreen={true}
                                loading="lazy"
                                class="rounded-lg shadow-lg"
                            >
                            </iframe>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer class="bg-gray-800 text-gray-200">
                    <div class="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between">
                        <p>
                            &copy; 2023 NexaFlow | Wolfaxen. All rights
                            reserved.
                        </p>
                        <div class="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" class="hover:text-white">
                                Privacy Policy
                            </a>
                            <a href="#" class="hover:text-white">
                                Terms of Service
                            </a>
                            <a href="#" class="hover:text-white">
                                Contact
                            </a>
                        </div>
                    </div>
                </footer>
            </body>
        </>
    );
}
