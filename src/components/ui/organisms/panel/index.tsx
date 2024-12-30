"use client"
import SocialItemsList from "./components/SocialItemsList";
import Toolbar from "./components/Toolbar";

export default function Panel() {

    return (
        <div className="w-full border-b z-50 bg-background">
            <div className="flex h-10 items-center justify-between md:px-6 px-3 container mx-auto">
                <SocialItemsList />
                <Toolbar />
            </div>
        </div>
    );
}
