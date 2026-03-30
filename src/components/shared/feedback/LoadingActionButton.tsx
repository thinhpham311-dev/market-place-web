import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function LoadingActionButton() {
  return (
    <Button variant="outline" size="icon" className="relative" disabled>
      <LoadingSpinner />
      <span>Loading</span>
    </Button>
  );
}
