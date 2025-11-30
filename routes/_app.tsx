import { type PageProps } from "$fresh/server.ts";
import Navbar from "../islands/Navbar.tsx";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wolfaxen | AI Automation & Process Optimisation Consultancy</title>
        <meta
          name="description"
          content="Wolfaxen is an AI automation and process optimisation consultancy. We build custom AI chatbots, integrate business systems, and automate workflows."
        />
        <link rel="stylesheet" href="/styles.css" />
        <script
          type="application/ld+json"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Wolfaxen",
              "url": "https://wolfaxen.com",
              "logo": "https://wolfaxen.com/logo.png",
              "description":
                "AI automation consultancy offering process mapping, workflow optimisation, AI chatbots, and systems integration.",
              "areaServed": "United Kingdom",
              "founder": {
                "@type": "Person",
                "name": "Ali Raza",
              },
              "sameAs": [
                "https://www.linkedin.com/in/ali-raza-cloudmaking/",
                "https://github.com/cloudmaking",
              ],
            }),
          }}
        />
      </head>
      <body class="bg-oreo-black text-warm-beige font-sans antialiased selection:bg-muted-gold selection:text-oreo-black flex flex-col min-h-screen">
        <Navbar />
        <main class="flex-grow">
          <Component />
        </main>
        <Footer />
      </body>
    </html>
  );
}
