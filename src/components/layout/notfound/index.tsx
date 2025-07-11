"use client"
import { useRouter } from "next/navigation";

//components
import { Button, Card, CardContent, CardDescription } from "@/components/ui"

export default function NotFound() {
    const router = useRouter();

    return (
        <Card className="flex  flex-col items-center justify-center border-none shadow-none text-center p-4 w-full">
            <CardContent className="p-10">
                <CardDescription className="text-gray-600 mb-6">
                    Your shopping cart is empty
                </CardDescription>
                <Button onClick={() => router.push("/")}>Go Shopping Now</Button>
            </CardContent>
        </Card>
    );
}
