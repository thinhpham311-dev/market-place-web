"use client"
import { useRouter } from "next/navigation";

//store
import { useAppSelector } from "@/lib/hooks"

//components
import { Button } from "@/components/ui/atoms";
import { RowList } from "@/components/ui/organisms"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetDescription,
    ScrollArea,
} from "@/components/ui/molecules"


//icons
import { ShoppingCart } from "lucide-react"

export default function DrawerCart() {
    const { items } = useAppSelector((state) => state.order.cart);
    const router = useRouter()
    return (
        <Sheet>

            <SheetTrigger asChild>
                <Button onClick={() => router.push("/")} variant="outline" size="icon" className="relative after:w-1.5 after:h-1.5 after:bg-red-600 after:absolute after:right-1 after:top-1 after:rounded-lg">
                    <ShoppingCart />
                </Button>
            </SheetTrigger>

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
                        <RowList data={items} />
                    </ScrollArea>
                    <SheetFooter className="flex flex-row justify-end py-3 rounded-md space-x-3">
                        <Button variant="outline" className="w-full" onClick={() => router.push("/cart")}>Check Out</Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}