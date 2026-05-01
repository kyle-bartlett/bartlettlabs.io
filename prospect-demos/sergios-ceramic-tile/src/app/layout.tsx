import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sergio's Ceramic Tile | Crosby, TX — 40+ Years of Expert Tile Installation",
  description:
    "Crosby's most trusted tile installer for over 40 years. 4.78★ Google rating. Ceramic tile, flooring, bathroom remodels, kitchen backsplash, and commercial tile work. Call today for a free estimate.",
  keywords: [
    "ceramic tile Crosby TX",
    "tile installation Houston",
    "bathroom remodel Crosby",
    "kitchen backsplash Crosby TX",
    "flooring Crosby Texas",
    "commercial tile Houston",
    "Sergio ceramic tile",
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
