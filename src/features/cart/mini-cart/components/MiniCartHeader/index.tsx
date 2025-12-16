
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import MiniCartTitle from "./MiniCartTitle";
import MiniCartViewMoreButton from "./MiniCartViewMoreButton";

export default function MiniCartHeader() {
    return (
        <DropdownMenuLabel className="flex flex-row justify-between items-center p-0 space-y-0">
            <MiniCartTitle />
            <MiniCartViewMoreButton />
        </DropdownMenuLabel>
    );
}
