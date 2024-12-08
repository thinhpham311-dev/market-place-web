"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/organisms"
import { FilterSearch, DropdownMode } from "@/components/ui/organisms"
import { Cart } from "./components/cart";

export default function SiteHeader() {
  const router = useRouter()
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background ">
      <div className="flex h-14 items-center md:px-6 px-3 container mx-auto">
        <div className=" flex gap-2 w-full justify-between">
          <div className="flex items-center space-x-5">
            <SidebarTrigger variant="outline" size="icon" />
            <div className="md:flex hidden  items-center space-x-1 cursor-pointer" onClick={() => router.push("/")}>
              <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="" />
              <h3 className="font-bold uppercase  ">Market Place</h3>
            </div>
          </div>
          <FilterSearch />
          <div className="flex items-center space-x-2">
            <DropdownMode />
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}