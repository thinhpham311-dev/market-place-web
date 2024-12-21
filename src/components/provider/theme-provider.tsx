"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, Toaster } from "@/components/provider"
import { Header, Footer, SidebarNavigation } from "@/components/ui/templates"
import { Provider } from "react-redux"
import { cn } from "@/lib/utils"
import store from "@/store"

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift()
    }
    return undefined
}

export const LoadingSpinner = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>)
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const [defaultOpen, setDefaultOpen] = React.useState<boolean>(false)
    // State to handle hydration mismatch
    const [isClient, setIsClient] = React.useState(false)
    // Set the component to render only on the client-side
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        const sidebarState = getCookie("sidebar:state")
        if (sidebarState) {
            setDefaultOpen(sidebarState === "false")
        }
    }, [])


    if (!isClient) {
        // Render nothing or a loading skeleton until client-side hydration
        return <div className="h-[100vh] w-full text-center flex justify-center items-center space-x-3  bg-background ">
            <span><LoadingSpinner /></span>
            <p><strong>Loading...</strong></p>
        </div>
    }

    return (
        <NextThemesProvider {...props}>
            <SidebarProvider defaultOpen={defaultOpen}>
                <Provider store={store}>
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
                </Provider>
            </SidebarProvider>
        </NextThemesProvider>
    )
}
