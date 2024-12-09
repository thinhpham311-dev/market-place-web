
import * as React from "react"
import Link from "next/link"
import { Separator, Button, Label } from "@/components/ui/atoms"
import { GridListWithPagination, ButtonTagsList } from "@/components/ui/organisms"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules"
import { productData } from "@/constants/data"

//icons
import { List } from "lucide-react"

export default function FilterAndSearchProductsList() {
    return (
        <div className="md:px-6 px-3 w-full grid md:grid-cols-8 grid-cols-1 gap-5">
            <div className="md:col-span-2 col-span-1 md:block  hidden">
                <Card className="sticky top-[80px]">
                    <CardHeader className="p-3">
                        <CardTitle className="flex flex-row gap-x-4 items-center">
                            <span><List size={20} /></span>
                            <strong className="text-sm"> All list</strong>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-3">
                        <CardTitle>
                            <strong className="text-sm"> Categories</strong>
                        </CardTitle>
                        <Link href="" className="cursor-pointer text-sm">
                            Any
                        </Link>
                    </CardContent>
                    <CardContent className="p-3">
                        <CardTitle>
                            <strong className="text-sm"> Price</strong>
                        </CardTitle>
                        <Link href="" className="cursor-pointer text-sm">
                            Any
                        </Link>
                    </CardContent>

                    <CardContent className="p-3">
                        <CardTitle>
                            <strong className="text-sm"> Customer Review</strong>
                        </CardTitle>
                        <Link href="" className="cursor-pointer text-sm">
                            Any
                        </Link>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-6 col-span-1">
                <Card className="flex flex-row flex-wrap items-center justify-between mb-5">
                    <CardContent className="p-3 flex items-center gap-3">
                        <Label>Result:</Label>
                        <strong>Pants</strong>
                        <Button variant="outline">Clear</Button>
                    </CardContent>
                    <CardContent className="p-3 flex items-center gap-3">
                        <ButtonTagsList
                            label="Sort"
                            className="mb-0 flex items-center gap-3"
                            data={["Newest", "Lowest", "Highest", "Rating"]}
                        />

                    </CardContent>
                </Card>
                <GridListWithPagination data={productData} itemsPerPage={18} />
            </div>
        </div>
    );
}


