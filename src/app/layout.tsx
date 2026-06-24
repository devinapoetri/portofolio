import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devina Budianti Poetri | Portfolio",
  description: "Personal portfolio of Devina Budianti Poetri, an Applied Information Systems (Smart City) student Passionate about data research, machine learning, AI, and building smart city technologies.",
  openGraph: {
    title: "Devina Budianti Poetri | Portfolio",
    description: "Personal portfolio of Devina Budianti Poetri, an Applied Information Systems (Smart City) student Passionate about data research, machine learning, AI, and building smart city technologies.",
    url: "https://devinapoetri.vercel.app",
    siteName: "Devina Budianti Poetri",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Developer Portfolio Banner",
      },
    ],
    locale: "id_ID",
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
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
