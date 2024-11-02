import { Head } from "$fresh/runtime.ts";

export default function ContactUs() {
    return (
        <>
            <Head>
                <title>Contact Us - NexaFlow | Wolfaxen</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <body class="bg-gray-100 font-sans">
                {/* Header */}
                <header class="bg-opacity-80 bg-black text-white text-center py-4">
                    <a href="/" class="text-2xl font-bold uppercase">
                        NexaFlow | Wolfaxen
                    </a>
                </header>

                {/* Contact Form Section */}
                <section class="flex items-center justify-center min-h-screen p-8">
                    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSesKo1z1PAgM9gSZI1PIcCLpVG8fXsDBqc7UQz-FNFR9mHo7Q/viewform?usp=sf_link"
                            class="w-full h-75vh responsive-iframe"
                        >
                        </iframe>
                    </div>
                </section>

                {/* Footer */}
                <footer class="bg-opacity-80 bg-black text-white text-center py-2">
                    &copy; 2023 NexaFlow | Wolfaxen. Empowering Organizations
                    for a Better Tomorrow.
                </footer>
            </body>
        </>
    );
}
