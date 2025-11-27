
import { CardFooter } from "@/components/ui";
import VoucherSection from "./VoucherSection";
import ActionsSection from "./ActionsSection";

export default function MainCartFooter() {

    return (
        <CardFooter className="col-span-12 flex-col space-y-2">
            <VoucherSection />
            <ActionsSection />
        </CardFooter>
    );
}
