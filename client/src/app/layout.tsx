import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MapIt",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/pin_logo.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Badeen+Display&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}