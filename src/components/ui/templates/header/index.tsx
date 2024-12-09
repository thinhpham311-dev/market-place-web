"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";


//components
import { Button } from "@/components/ui/atoms";
import { SearchFormWithFilters, DropdownMode, SidebarTrigger, RowList } from "@/components/ui/organisms"
import {
  TooltipWrapper, Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetHeader,
  SheetDescription,
  ScrollArea,
} from "@/components/ui/molecules"

//datas
import { productData } from "@/constants/data"

//icons
import { ShoppingCart } from "lucide-react"

export default function SiteHeader() {
  const router = useRouter()
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background ">
      <div className="flex h-14 items-center md:px-6 px-3 container mx-auto">
        <div className=" flex gap-2 w-full justify-between">
          <div className="flex items-center space-x-5">
            <SidebarTrigger variant="outline" size="icon" />
            <div className="md:flex hidden  items-center space-x-1 cursor-pointer" onClick={() => router.push("/")}>
              <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="" />
              <h3 className="font-bold uppercase  ">Market Place</h3>
            </div>
          </div>
          <SearchFormWithFilters />
          <div className="flex items-center space-x-2">
            <DropdownMode />
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
                  <SheetFooter className="flex flex-row justify-end p-3 rounded-md space-x-3">
                    <Button variant="outline" >Payment</Button>
                    <SheetClose asChild>
                      <Button variant="outline" >Cancel</Button>
                    </SheetClose>
                  </SheetFooter>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}