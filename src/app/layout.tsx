import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Header } from "@/components"
import "./globals.css";


export const metadata: Metadata = {
  title: "Market Place",
  description: "Market Place",
};

export default function RootLayout({
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
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
