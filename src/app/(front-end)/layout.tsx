import type { Metadata } from "next";
import { cookies } from "next/headers"
import { ThemeProvider } from "@/components/ui/organisms/theme-provider"
import { Header, Footer } from "@/components/ui/templates"
import { TooltipProvider } from "@/components/ui/atoms"
import { SidebarProvider } from "@/components/ui/organisms"
import { SidebarNavigation } from "@/components/ui/templates";
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
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "false"

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
            <SidebarProvider

              defaultOpen={defaultOpen}>
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
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
