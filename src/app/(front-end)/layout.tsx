
import type { Metadata } from "next";
import { Header, Footer, SidebarNavigation } from "@/components/ui/templates"
import { ThemeProvider, Toaster } from "@/components/ui/organisms"
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

          <div>
            <SidebarNavigation />
          </div>
          <div className="flex-1 w-full">
            <Header />
            <main className="container mx-auto">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  );
}
