import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Header, Footer } from "@/components"
import { TooltipProvider } from "@/components/ui/tooltip"
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
          <TooltipProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
