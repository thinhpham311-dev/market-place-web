'use client'
//components
import { List } from "@/components";
//datas
import { productData } from "@/constants/data";

export default function Detail() {

    return (
        <div className="space-y-10 ">
            <div className="grid md:grid-cols-8 grid-cols-1 md:px-12 px-6">
                <div className="col-span-6">
                    Product Detail
                </div>
                <div className="col-span-2">
                    policy
                </div>
            </div>
            <List type="carousel" title="Relate products" article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id' data={productData} />
        </div>
    );
}


