import { ButtonSearch } from "./button"
import { InputSearch } from "./input"
import { SelectType } from "./select"

export const FilterSearch = () => {
    return (
        <div className=" md:flex hidden  md:w-[40%] items-center space-x-2">
            <SelectType />
            <InputSearch />
            <ButtonSearch />
        </div>
    )
}

