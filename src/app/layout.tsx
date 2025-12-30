// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaveCode | Deep Stack Developer & Digital Treasure Hunter",
  description: "CaveCode is a professional Full Stack Developer with 5+ years of experience mining digital treasures. Specializing in React, Next.js, Node.js, and scalable cloud solutions. Explore deep layer projects and innovative web development.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "React Native Developer",
    "AWS Developer",
    "MongoDB Developer",
    "Digital Solutions",
    "Web Applications",
    "Mobile App Development",
    "CaveCode Portfolio"
  ],
  authors: [{ name: "CaveCode", url: "https://cavecode.dev" }],
  creator: "CaveCode",
  publisher: "CaveCode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cavecode.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "CaveCode | Deep Stack Developer & Digital Treasure Hunter",
    description: "Professional Full Stack Developer mining digital treasures with React, Next.js, Node.js, and scalable cloud solutions.",
    url: "https://cavecode.dev",
    siteName: "CaveCode Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CaveCode Portfolio - Deep Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CaveCode | Deep Stack Developer Portfolio",
    description: "Exploring digital caverns and mining technological treasures. Full Stack Developer specializing in modern web technologies.",
    images: ["/twitter-image.png"],
    creator: "@cavecode_dev",
    site: "@cavecode_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b45309" />
        <meta name="msapplication-TileColor" content="#b45309" />
        <meta name="theme-color" content="#0c0a09" />

        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "CaveCode",
              "url": "https://cavecode.dev",
              "image": "https://cavecode.dev/og-image.png",
              "jobTitle": "Full Stack Developer & Digital Treasure Hunter",
              "description": "Professional Full Stack Developer with 5+ years of experience mining digital treasures and creating innovative web solutions.",
              "email": "work.osamanaeem@gmail.com",
              "telephone": "+92-310-5963894",
              "sameAs": [
                "https://github.com/osama554",
                "https://linkedin.com/in/cavecode",
                "https://twitter.com/cavecode_dev"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "AWS",
                "React Native",
                "Docker",
                "Kubernetes",
                "Web Development",
                "Mobile App Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "CaveCode Digital Exploration"
              }
            })
          }}
        />

        {/* Additional Structured Data for Portfolio */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://cavecode.dev",
              "name": "CaveCode Portfolio",
              "description": "Digital portfolio of a Full Stack Developer specializing in modern web technologies",
              "publisher": {
                "@type": "Person",
                "name": "CaveCode"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cavecode.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-cave-dark text-stone-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}