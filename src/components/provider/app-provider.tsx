"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useToast } from "@/lib/hooks"

import { Header, Footer, SidebarNavigation, AdminHeader } from "@/components/layout"
import {
    LoadingSpinner,
    SidebarProvider,
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui"
import { Provider } from "react-redux"
import store, { persistor } from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import ShoppingCartRoot from "@/features/cart/cart-root"

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined
}



export function AppProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    const [defaultOpen, setDefaultOpen] = React.useState<boolean>(false)
    const { toasts } = useToast()


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
                        <ShoppingCartRoot>
                            <PersistGate loading={
                                <div className="h-[100vh] w-full text-center flex justify-center items-center space-x-3 bg-background">
                                    <span><LoadingSpinner /></span>
                                    <p><strong>Loading...</strong></p>
                                </div>
                            }
                                persistor={persistor}>

                                <AdminHeader />
                                <Header />
                                <main>{children}</main>
                                <Footer />
                                <ToastProvider>
                                    {toasts.map(function ({ id, title, description, action, ...props }) {
                                        return (
                                            <Toast key={id} {...props}>
                                                <div className="grid gap-1">
                                                    {title && <ToastTitle>{title}</ToastTitle>}
                                                    {description && (
                                                        <ToastDescription>{description}</ToastDescription>
                                                    )}
                                                </div>
                                                {action}
                                                <ToastClose />
                                            </Toast>
                                        )
                                    })}
                                    <ToastViewport />
                                </ToastProvider>

                            </PersistGate>
                        </ShoppingCartRoot>
                    </Provider>
                </div>
            </SidebarProvider>
        </NextThemesProvider>
    )
}
