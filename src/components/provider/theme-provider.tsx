"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, Toaster } from "@/components/provider"
import { Header, Footer, SidebarNavigation } from "@/components/ui/organisms"
import { Provider } from "react-redux"
import { cn } from "@/lib/utils"
import store from "@/store"
import mockServer from "@/mock"

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined
}

const LoadingSpinner = ({ className }: { className?: string }) => (
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
    </svg>
)

const environment = process.env.NODE_ENV
const enableMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === "true"

// Initialize mock server for non-production environments with mock enabled
if (typeof window === 'undefined' && environment !== 'production' && enableMock) {
    mockServer({ environment })
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const [defaultOpen, setDefaultOpen] = React.useState<boolean>(false)
    const [isClient, setIsClient] = React.useState(false)

    // Hydration mismatch handler
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    // Sidebar state handler based on cookie
    React.useEffect(() => {
        const sidebarState = getCookie("sidebar:state")
        if (sidebarState) {
            setDefaultOpen(sidebarState === "false")
        }
    }, [])

    // Client-side mock server initialization
    React.useEffect(() => {
        if (environment !== 'production' && enableMock) {
            mockServer({ environment }) // Initialize mock server on client-side
        }
    }, [])

    if (!isClient) {
        // Render a loading spinner while waiting for client-side hydration
        return (
            <div className="h-[100vh] w-full text-center flex justify-center items-center space-x-3 bg-background">
                <span><LoadingSpinner /></span>
                <p><strong>Loading...</strong></p>
            </div>
        )
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
                        <main className="container mx-auto">{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </Provider>
            </SidebarProvider>
        </NextThemesProvider>
    )
}
