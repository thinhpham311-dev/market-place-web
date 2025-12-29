import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="space-y-6 p-4 container mx-auto">
      <div className="h-[100vh] w-full text-center flex justify-center items-center space-x-3 bg-background">
        <span>
          <LoadingSpinner />
        </span>
        <p>
          <strong>Loading...</strong>
        </p>
      </div>
    </div>
  );
}
