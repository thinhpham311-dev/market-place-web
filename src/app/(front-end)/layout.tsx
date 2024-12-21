
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/provider"
import "../globals.css";


export const metadata: Metadata = {
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
