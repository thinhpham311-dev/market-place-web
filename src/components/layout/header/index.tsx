"use client"
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui"
import { ThemeToggle } from "@/components/shared"
import { UserDropdown, SearchForm, Logo } from "@/components/shared"
import Cart from "@/features/cart"

export default function SiteHeader() {
  const path = usePathname()

  return (
    <header className="w-full border-b sticky top-0 bg-background z-10">
      <div className="flex h-14 items-center md:px-6 px-3 container mx-auto">
        <div className="flex gap-2 w-full justify-between">
          <div className="flex items-center space-x-2">
            <SidebarTrigger variant="outline" size="icon" />
            <Logo />
          </div>
          <div className="flex-1 lg:flex md:flex hidden items-center">
            <SearchForm />
          </div>
          <div className="flex items-center space-x-2">
            {path !== "/cart" && path !== "/checkout" && <Cart />}
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
