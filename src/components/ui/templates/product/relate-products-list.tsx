
import * as React from "react"

//components
import { CarouselList } from "@/components/ui/organisms"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/molecules"
import { Button } from "@/components/ui/atoms"

//icons
import { ArrowRight } from "lucide-react"

//datas
import { productData } from "@/constants/data"


export default function RelateProductList() {
    return (
        <div className="md:px-6 px-3">
            <Card className="border-0">
                <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">Relate Products</CardTitle>
                        <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-0">
                    <CarouselList data={productData} />
                </CardContent>
            </Card>
        </div>
    );
}


