import { ButtonSearch } from "./components/button"
import { InputSearch } from "./components/input"
import { SelectType } from "./components/select"

export const SearchFormWithFilters = () => {
    return (
        <div className=" md:flex hidden  md:w-[40%] items-center space-x-2">
            <SelectType />
            <InputSearch />
            <ButtonSearch />
        </div>
    )
}

