"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    ScrollArea
} from "@/components/ui/molecules"

//icons
import { Bell, Globe } from "lucide-react"
import Image from "next/image"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function Toolbar() {
    return (
        <NavigationMenu className="z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="space-x-2 px-2"><Bell size={15} /><span className="md:block hidden">Notifition</span></NavigationMenuTrigger>
                    <NavigationMenuContent >
                        <ScrollArea className="h-72 rounded-md border">
                            <ul className="w-[400px]  md:w-[300px] lg:w-[300px] ">
                                {components.map((component) => (
                                    <ListItem
                                        className="col-span-1"
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </ScrollArea>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="space-x-2 px-2"><Globe size={15} /><span className="md:block hidden">Lucation</span></NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-[400px] md:w-[300px] lg:w-[200px]  ">
                            <ListItem href="/docs" title="English" imageLink="https://res.cloudinary.com/dgincjt1i/image/upload/v1735697230/inkjssy1xcvlwadmr9vz.png" />
                            <ListItem href="/docs/installation" title="Vietnamese" imageLink="https://res.cloudinary.com/dgincjt1i/image/upload/v1747275485/Flag_of_Vietnam.svg_qjy9mr.png" />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuViewport className="absolute right-0 left-auto" />

            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    imageLink?: string;
    imageClassName?: string
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps
>(({ className, title, imageLink, children, imageClassName, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "flex items-center gap-x-3 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <Image
                        className={cn("aspect-video	object-cover bg-no-repeat", imageClassName)}
                        src={imageLink ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1735697706/images_zxsvly.png"}
                        width={40}
                        height={30}
                        loading="lazy"
                        alt={title} />
                    <div className="text-sm font-medium leading-none">
                        <p>
                            <strong>
                                {title}
                            </strong>
                        </p>
                        {
                            children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                                {children}
                            </p>
                        }
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
