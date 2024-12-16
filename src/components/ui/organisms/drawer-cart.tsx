"use client"
import { useRouter } from "next/navigation";


//components
import { Button } from "@/components/ui/atoms";
import { RowList } from "@/components/ui/organisms"
import {
    TooltipWrapper, Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetDescription,
    ScrollArea,
} from "@/components/ui/molecules"

//datas
import { productData } from "@/constants/data"

//icons
import { ShoppingCart } from "lucide-react"

export function DrawerCart() {
    const router = useRouter()
    return (
        <Sheet>
            <TooltipWrapper content="Cart">
                <SheetTrigger asChild>
                    <Button onClick={() => router.push("/")} variant="outline" size="icon" className="relative after:w-1.5 after:h-1.5 after:bg-red-600 after:absolute after:right-1 after:top-1 after:rounded-lg">
                        <ShoppingCart />
                    </Button>
                </SheetTrigger>
            </TooltipWrapper>
            <SheetContent className=" p-2  w-full h-full">
                <div className="mx-auto w-full flex flex-col justify-between h-full">
                    <SheetHeader className="flex flex-row justify-between mb-3">
                        <div className=" flex items-center gap-x-5 w-5/6">
                            <span><ShoppingCart size={30} /></span>
                            <div>
                                <SheetTitle className="flex flex-row items-center"> Cart</SheetTitle>
                                <SheetDescription className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        <RowList data={productData} />
                    </ScrollArea>
                    <SheetFooter className="flex flex-row justify-end py-3 rounded-md space-x-3">
                        <Button variant="outline" className="w-full" onClick={() => router.push("/cart")}>Check Out</Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}