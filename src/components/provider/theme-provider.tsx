"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, Toaster } from "@/components/provider"
import { Header, Footer, SidebarNavigation } from "@/components/ui/templates"
import { Provider } from "react-redux"
import store from "@/store"

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift()
    }
    return undefined
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const [defaultOpen, setDefaultOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        const sidebarState = getCookie("sidebar:state")
        if (sidebarState) {
            setDefaultOpen(sidebarState === "false")
        }
    }, [])

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
