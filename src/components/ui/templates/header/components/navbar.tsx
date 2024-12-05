import Image from "next/image"
import DropdownMode from "../../../organisms/dropdown-mode"
import { Cart } from "@/components/ui/organisms"
import { Navigation, FilterSearch } from "@/components/ui/organisms"

export function Navbar() {
    return (
        <div className=" flex gap-2 w-full justify-between">
            <div className="flex items-center space-x-5">
                <Navigation />
                <div className="md:flex hidden  items-center space-x-1 ">
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
    )
}

