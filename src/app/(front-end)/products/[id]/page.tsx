'use client'
//components
import { DetailProduct, RelateProductsList } from "@/components/ui/templates";

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            <DetailProduct />
            <RelateProductsList />
        </div>
    );
}


