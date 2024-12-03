import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DropdownMode from "./dropdownMode"
import DrawerToggle from "./drawer"
import { Search } from "lucide-react"
import { NavbarMenu } from "@/components/ui/navbar-menu"
import SearchLive from "./search"

export function Navbar() {
    return (
        <div className=" flex gap-2 w-full justify-between">
            <div className="flex items-center space-x-5">
                <NavbarMenu />
                <div className="md:flex hidden  items-center space-x-1 ">
                    <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="" />
                    <h3 className="font-bold uppercase  ">Market Place</h3>
                </div>
            </div>
            <SearchLive />
            <div className="flex items-center space-x-2">
                <DropdownMode />
                <DrawerToggle />
            </div>
        </div>
    )
}

