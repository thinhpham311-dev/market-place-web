import type { Metadata } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import AppProvider from "@/components/provider/app-provider";

import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  icons:
    "https://res.cloudinary.com/di6zporch/image/upload/t_My Logo/v1730777885/market-place-logo_iz3rdk.svg",
  title: "Mini Market",
  description: "Mini Market",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${montserrat.variable} ${dancingScript.variable}`}>
        <AppProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
