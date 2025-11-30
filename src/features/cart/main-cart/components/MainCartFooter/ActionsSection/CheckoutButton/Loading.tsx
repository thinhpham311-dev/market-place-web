import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="relative"
            disabled={true}
        >
            <LoadingSpinner />  <span>Loading</span>
        </Button>
    );
}

