"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, Toaster } from "@/components/provider"
import { Header, Footer, SidebarNavigation } from "@/components/ui/organisms"
import { LoadingSpinner } from "../ui/molecules"
import { Provider } from "react-redux"
import store from "@/store"

// import mockServer from "@/mock"
import Panel from "../ui/organisms/panel"


function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined
}

// const environment = process.env.NODE_ENV
// const enableMock = process.env.NEXT_PUBLIC_ENABLE_MOCK === "true"

// // Initialize mock server for non-production environments with mock enabled
// if (typeof window === 'undefined' && environment !== 'production' && enableMock) {
//     mockServer({ environment })
// }

export function AppProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
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
    // React.useEffect(() => {
    //     if (environment !== 'production' && enableMock) {
    //         mockServer({ environment }) // Initialize mock server on client-side
    //     }
    // }, [])

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
                        <Panel />
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </Provider>
            </SidebarProvider>
        </NextThemesProvider>
    )
}
