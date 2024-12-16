import * as React from "react"

//components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules"
import { GridListWithLoading } from "@/components/ui/organisms"

//datas
import { productData } from "@/constants/data"


const SuggestProductsList = () => {

    return (
        <div className="md:px-6 px-3">
            <Card className="border-0">
                <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                    <CardTitle className="mb-3 capitalize text-center mx-auto">Suggestion today</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <GridListWithLoading data={productData} itemsPerPage={12} className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3" />
                </CardContent>
            </Card >
        </div>
    );
}

export default SuggestProductsList
