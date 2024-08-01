import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "./font/Satoshi-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "MH Blog App",
  description: "An app for discovering and reading blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} bg-neutral-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
