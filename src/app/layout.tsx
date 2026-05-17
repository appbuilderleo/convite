import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Cinzel,
  Cinzel_Decorative,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convite de Casamento | A Noiva & Paulo",
  description:
    "Celebração do Sagrado Matrimónio de A Noiva e Paulo — 14 de Setembro de 2025, Maputo.",
  openGraph: {
    title: "Convite de Casamento | A Noiva & Paulo",
    description: "Junte-se a nós na celebração do nosso matrimónio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${cormorant.variable} ${ebGaramond.variable} ${cinzel.variable} ${cinzelDecorative.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
