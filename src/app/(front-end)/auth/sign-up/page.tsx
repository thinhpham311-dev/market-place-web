'use client'
//components
import { TabsAuth } from "@/components/ui/templates"

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            <TabsAuth isSignIn isSignUp defaultTab="signUp" />
        </div>
    );
}


