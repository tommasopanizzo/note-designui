import type { Metadata } from "next";
import { Caveat, Special_Elite } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { ProjectTopbar } from "@/components/project-banner";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "Note Design UI - @chumy",
  description: "Notepad, Post-it Cards, Post-it Stacked. HTML experiments adapted for Next.js.",
  icons: {
    icon: "/project.png",
    apple: "/project.png",
  },
  openGraph: {
    images: ["/project.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/project.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${specialElite.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <ProjectTopbar />
        <div className="min-h-screen pt-20 sm:pt-24">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
