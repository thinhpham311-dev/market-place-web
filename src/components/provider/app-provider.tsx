"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, Toaster } from "@/components/provider"
import { Header, Footer, SidebarNavigation, AdminHeader } from "@/components/layout"
import { LoadingSpinner } from "@/components/ui"
import { Provider } from "react-redux"
import store, { persistor } from "@/store"
import { PersistGate } from "redux-persist/integration/react"


function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined
}



export function AppProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
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
                <div>
                    <SidebarNavigation />
                </div>
                <div className="flex-1 w-full">
                    <Provider store={store}>
                        <PersistGate loading={
                            <div className="h-[100vh] w-full text-center flex justify-center items-center space-x-3 bg-background">
                                <span><LoadingSpinner /></span>
                                <p><strong>Loading...</strong></p>
                            </div>
                        } persistor={persistor}>
                            <AdminHeader />
                            <Header />
                            <main>{children}</main>
                            <Footer />
                            <Toaster />
                        </PersistGate>
                    </Provider>
                </div>
            </SidebarProvider>
        </NextThemesProvider>
    )
}
