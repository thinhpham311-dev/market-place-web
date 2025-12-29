import type { Metadata } from "next";
import dynamic from "next/dynamic";

import "./globals.css";

const AppProvider = dynamic(() => import("@/components/provider/app-provider"), {
  ssr: false,
});

export const metadata: Metadata = {
  icons:
    "https://res.cloudinary.com/di6zporch/image/upload/t_My Logo/v1730777885/market-place-logo_iz3rdk.svg",
  title: "Market Place",
  description: "Market Place",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <AppProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
