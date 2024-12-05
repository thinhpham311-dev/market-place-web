'use client'
//components
import { CarouselList } from "@/components/ui/organisms";
import { Detail } from "@/components/ui/templates";
//datas
import { productData } from "@/constants/data";

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            <Detail />
            <CarouselList title="Relate products" article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id' data={productData} />
        </div>
    );
}


