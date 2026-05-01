import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/layout/Shell";

// Roboto Mono drives every `font-mono` Tailwind class via the --font-mono var.
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hafsa Moussaid — Software Engineer",
  description:
    "Building secure, scalable systems with precision. Software engineer focused on architecture that holds under pressure.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
