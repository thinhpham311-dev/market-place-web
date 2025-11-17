import { LoadingSpinner, Button } from "@/components/ui";

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

