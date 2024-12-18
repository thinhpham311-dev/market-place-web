"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Provider } from "react-redux";
import store from "@/store";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>
        <Provider store={store}>
            {children}
        </Provider>
    </NextThemesProvider>
}
