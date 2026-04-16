import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/data/posts";

export const metadata: Metadata = {
  title: "frostsalix | Small web goblin den",
  description:
    "A mildly unhinged corner where the furniture is imaginary and the links still work.",
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
