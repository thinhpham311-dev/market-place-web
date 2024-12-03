import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import SelectType from "./select"

const SearchLive = () => {
    return (
        <div className=" md:flex hidden  md:w-[40%] items-center space-x-2">
            <div>
                <SelectType />
            </div>
            <Input type="text" placeholder="Search" className="flex-1" />
            <Button enterKeyHint="search" variant="outline" type="submit" size="icon"><Search className="h-[2rem] w-[2rem]" /></Button>
        </div>
    )
}

export default SearchLive