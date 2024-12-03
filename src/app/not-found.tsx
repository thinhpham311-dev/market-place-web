'use client'
import { Button } from "@/components/ui/button"; // Import Button từ shadcn/ui
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                Oops! The page you looking for does exist or has been moved.
            </p>
            <Button
                variant="default"
                size="lg"
                className="px-6"
                onClick={() => router.push("/")}
            >
                Go Back to Home
            </Button>
        </div>
    );
}
