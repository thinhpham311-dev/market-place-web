"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useToast } from "@/lib/hooks"

// Layout components
import { Header, Footer, SidebarNavigation, AdminHeader } from "@/components/layout"

// UI components
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

// Redux
import { Provider } from "react-redux"
import store, { persistor } from "@/store"
import { PersistGate } from "redux-persist/integration/react"

// Features
import ShoppingCartRoot from "@/features/cart/cart-root"

/* -------------------------------- Utilities -------------------------------- */

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined
}

/* ------------------------------- Toast Renderer ------------------------------ */

const ToastRenderer = () => {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, action, ...props }) => (
                <Toast key={id} {...props}>
                    <div className="grid gap-1">
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                    </div>

                    {action}
                    <ToastClose />
                </Toast>
            ))}
            <ToastViewport />
        </ToastProvider>
    )
}

/* ------------------------------- Main Provider ------------------------------- */

const AppProvider = ({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
    const [defaultOpen, setDefaultOpen] = React.useState(false)

    // Load sidebar state from cookie
    React.useEffect(() => {
        const sidebarState = getCookie("sidebar:state")
        if (sidebarState) {
            setDefaultOpen(sidebarState === "false")
        }
    }, [])

    return (
        <NextThemesProvider {...props}>
            <SidebarProvider defaultOpen={defaultOpen}>
                <SidebarNavigation />

                <div className="flex-1 w-full">
                    <Provider store={store}>
                        <ShoppingCartRoot>
                            <PersistGate
                                loading={
                                    <div className="h-[100vh] w-full flex items-center justify-center space-x-3 bg-background">
                                        <LoadingSpinner />
                                        <p><strong>Loading...</strong></p>
                                    </div>
                                }
                                persistor={persistor}
                            >
                                <AdminHeader />
                                <Header />

                                <main>{children}</main>

                                <Footer />
                                <ToastRenderer />
                            </PersistGate>
                        </ShoppingCartRoot>
                    </Provider>
                </div>
            </SidebarProvider>
        </NextThemesProvider>
    )
}

export default AppProvider
