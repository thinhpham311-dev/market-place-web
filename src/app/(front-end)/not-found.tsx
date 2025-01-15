'use client'
import { Button } from "@/components/ui/atoms/button"; // Import Button từ shadcn/ui
import { Card, CardDescription, CardTitle } from "@/components/ui/molecules";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <Card className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</CardTitle>
            <CardDescription className="text-gray-600 mb-6">
                Oops! The page you looking for does exist or has been moved.
            </CardDescription>
            <Button
                variant="default"
                size="lg"
                className="px-6"
                onClick={() => router.push("/")}
            >
                Go Back to Home
            </Button>
        </Card>
    );
}
