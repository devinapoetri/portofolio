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
  description: "Personal portfolio of Devina Budianti Poetri, an Applied Information Systems student passionate about Data Analysis and UI/UX.",
  openGraph: {
    title: "Devina Budianti Poetri | Portfolio",
    description: "Personal portfolio of Devina Budianti Poetri, an Applied Information Systems student passionate about Data Analysis and UI/UX.",
    url: "https://portfolio.example.com",
    siteName: "Developer Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
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
