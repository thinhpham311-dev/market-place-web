import { Button } from "@/components/ui/button";
import { Tickets, ChevronRight } from "lucide-react";

export default function VoucherSection() {
  return (
    <div className="flex items-center justify-between w-full border px-3 py-2">
      <strong className="inline-flex items-center gap-4">
        <Tickets />
        <span className="text-md">Voucher Code:</span>
      </strong>
      <Button variant="ghost" size="sm">
        View More
        <ChevronRight />
      </Button>
    </div>
  );
}
