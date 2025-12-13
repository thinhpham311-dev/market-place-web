import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

export default function LoadingSkeleton() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="relative"
            disabled={true}
        >
            <span><LoadingSpinner /></span>
        </Button>
    );
}

