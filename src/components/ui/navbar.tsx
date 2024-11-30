import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Search, ShoppingCart } from "lucide-react"
import { NavbarMenu } from "@/components/ui/navbar-menu"

export function Navbar() {
    return (
        <div className=" flex gap-2 w-full justify-between">
            <div className="flex items-center space-x-2">
                <NavbarMenu />
                <div className="md:flex hidden  items-center space-x-2 ">
                    <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="" />
                    <h3 className="font-bold uppercase  ">Market Place</h3>
                </div>
            </div>
            <div className=" md:flex hidden  md:w-[30%] items-center space-x-2">
                <Input type="text" placeholder="Search" className="flex-1" />
                <Button enterKeyHint="search" variant="outline" type="submit" size="icon"><Search className="h-[2rem] w-[2rem]" /></Button>
            </div>
            <div className="flex items-center space-x-2">
                <ModeToggle />
                <Button variant="outline" size="icon"><ShoppingCart /></Button>
            </div>
        </div>
    )
}

