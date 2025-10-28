import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const radioCanada = localFont({
  src: "../../public/fonts/RadioCanadaBig-VariableFont_wght.ttf",
  variable: "--font-radio-canada",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const barriecito = localFont({
  src: "../../public/fonts/Barriecito-Regular.otf",
  variable: "--font-barriecito",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eadaodev.com"),
  title: {
    default: "É. Adão Dev. - Desenvolvedor Front-end Freelancer",
    template: "%s | É. Adão Dev."
  },
  description: "É. Adão Dev. - Desenvolvedor Front-end especializado em JavaScript, React, Next.js, TypeScript, HTML5, CSS3 e TailwindCSS. Experiência em criar sites responsivos e interativos.",
  keywords: [
    "desenvolvedor front-end",
    "freelancer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "HTML5",
    "CSS",
    "CSS3",
    "Web Developer",
    "portfolio",
    "desenvolvimento web",
    "interfaces modernas",
    "websites responsivos"
  ],
  authors: [{ name: "Éverton Adão" }],
  creator: "Éverton Adão",
  publisher: "Éverton Adão",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/imgs/perfil/logoPiscando.png",
    apple: "/imgs/perfil/logoPiscando.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.eadaodev.com",
    siteName: "É. Adão Dev.",
    title: "É. Adão Dev. - Desenvolvedor Front-end Freelancer",
    description: "Portfolio de É. Adão Dev. - Desenvolvedor Front-end especializado em React, Next.js e interfaces modernas.",
    images: [
      {
        url: "/imgs/imgPortfolio/eadaodev.jpeg",
        width: 3844,
        height: 1932,
        alt: "É. Adão Dev. - Desenvolvedor Front-end",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "É. Adão Dev. - Desenvolvedor Front-end Freelancer",
    description: "É. Adão Dev. - Desenvolvedor Front-end especializado em JavaScript, React, Next.js, TypeScript, HTML5, CSS3 e TailwindCSS",
    images: ["/imgs/imgPortfolio/eadaodev.jpeg"],
    creator: "",
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
  category: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`translated-ltr bg-[var(--cor-terciario)] ${radioCanada.variable} ${barriecito.variable}`}>
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/imgs/perfil/perfil.webp" as="image" type="image/webp" />
        <link rel="preload" href="/icons/mao-d-a-cursor.png" as="image" />
        <link rel="preload" href="/icons/mao-d-d-pointer.png" as="image" />
        
        {/* DNS Prefetch para domínios externos */}
        <link rel="dns-prefetch" href="https://3xmend.com" />
        <link rel="dns-prefetch" href="https://atlas-api-drab.vercel.app" />
        
        {/* Otimizações de viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        cz-shortcut-listen="true"
        className={`antialiased ${radioCanada.className}`}
      >
        {children}
      </body>
    </html>
  );
}
