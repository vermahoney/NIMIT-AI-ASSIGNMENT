import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NimitAI | Sales Signal Analyzer",
  description: "Paste a sales meeting transcript and receive AI-detected sales signals with coaching recommendations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden px-4 pb-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)]" />
        {children}
      </body>
    </html>
  );
}
