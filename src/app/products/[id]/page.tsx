'use client'
//components
import { CarouselList } from "@/components/ui/organisms";
import { Detail } from "@/components/ui/templates";
//datas
import { productData } from "@/constants/data";

export default function Page() {

    return (
        <div className="space-y-10 ">
            <div className="grid md:grid-cols-8 grid-cols-1 md:px-12 px-6">
                <div className="col-span-6">
                    <Detail />
                </div>
                <div className="col-span-2">
                    policy
                </div>
            </div>
            <CarouselList title="Relate products" article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id' data={productData} />
        </div>
    );
}


