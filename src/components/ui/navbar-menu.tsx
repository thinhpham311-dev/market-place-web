"use client"
import { useState } from 'react';
import Image from 'next/image'
import { Sheet, SheetTitle, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Menu as MenuIcon } from 'lucide-react';
import { Search, Filter } from "lucide-react"

const mobileItems = ['Home', 'Categories', 'About Us'];

export function NavbarMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" >
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-4">
                <div className="flex items-center space-x-2 ">
                    <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="" />
                    <SheetTitle className="font-bold uppercase heading-3 ">  Market Place</SheetTitle>

                </div>
                <div className=" md:hidden flex items-center space-x-2 py-3">
                    <Input type="text" placeholder="Search" className="flex-1" />
                    <Button enterKeyHint="search" variant="outline" type="submit" size="icon"><Search className="h-[2rem] w-[2rem]" /></Button>
                    <Button variant="outline" type="button" size="icon"><Filter className="h-[2rem] w-[2rem]" /></Button>
                </div>

                <div className="flex flex-col items-start justify-center py-3">
                    {mobileItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="link"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </SheetContent>

        </Sheet>
    );
}