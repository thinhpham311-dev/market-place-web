"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

// Layout components
import { Header, Footer, SidebarNavigation, AdminHeader } from "@/components/layout";

// UI components
import { SidebarProvider } from "@/components/ui/sidebar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Redux
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getLanguageFromSubdomain, getSubdomainFromHostname } from "@/lib/i18n/location-subdomain";
import { setLanguage } from "@/store/settings/languageSlice";

// Features
import ShoppingCartRoot from "@/features/cart/cart-root";

/* -------------------------------- Utilities -------------------------------- */

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
};

function AppLanguageEffect() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.settings.language.current);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const detectedSubdomain = getSubdomainFromHostname(window.location.hostname);
      const detectedLanguage = getLanguageFromSubdomain(detectedSubdomain);

      if (detectedLanguage && detectedLanguage !== currentLanguage) {
        dispatch(setLanguage(detectedLanguage));
        return;
      }
    }

    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, dispatch]);

  React.useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return null;
}

const AppProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  const [defaultOpen, setDefaultOpen] = React.useState(false);

  // Load sidebar state from cookie
  React.useEffect(() => {
    const sidebarState = getCookie("sidebar:state");
    if (sidebarState) {
      setDefaultOpen(sidebarState === "false");
    }
  }, []);

  return (
    <NextThemesProvider {...props}>
      <Provider store={store}>
        <ShoppingCartRoot>
          <PersistGate
            loading={
              <div className="h-[100vh] w-full flex items-center justify-center space-x-3 bg-background">
                <LoadingSpinner />
                <p>
                  <strong>Loading...</strong>
                </p>
              </div>
            }
            persistor={persistor}
          >
            <AppLanguageEffect />
            <SidebarProvider defaultOpen={defaultOpen}>
              <SidebarNavigation />

              <div className="flex-1 w-full">
                <AdminHeader />
                <Header />
                <main>{children}</main>
                <Footer />
                <Toaster />
              </div>
            </SidebarProvider>
          </PersistGate>
        </ShoppingCartRoot>
      </Provider>
    </NextThemesProvider>
  );
};

export default AppProvider;
