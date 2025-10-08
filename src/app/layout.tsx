import type { Metadata } from "next";
import "./globals.css";
import FooterContato from "@/components/footerContato";

export const metadata: Metadata = {
  title: "É. Adão Dev.",
  description: "É. Adão Dev. - Dev Front-end freelancer",
  icons: {
    icon: "/imgs/self/logoPiscando.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="translated-ltr">
      <body
        cz-shortcut-listen="true"
        className={'antialiased'}
      >
        {children}
      </body>
    </html>
  );
}
