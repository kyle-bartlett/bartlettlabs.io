import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santiago's Auto Repair | Baytown, TX — Trusted Auto Service",
  description:
    "Baytown's most trusted auto repair shop. 4.9★ Google rating with 75+ reviews. Oil changes, brake repair, engine diagnostics, and more. Call (832) 580-2569.",
  keywords: [
    "auto repair Baytown TX",
    "mechanic Baytown",
    "oil change Baytown",
    "brake repair Baytown",
    "Santiago auto repair",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
