import { LoadingSpinner } from "@/components/ui";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-2/3">
            <LoadingSpinner />
        </div>
    );
}
