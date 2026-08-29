import { CardFooter } from "@/components/ui/card";
import ActionsSection from "./ActionsSection";

export default function MainCartFooter() {
  return (
    <CardFooter className="col-span-12 flex-col space-y-2">
      <ActionsSection />
    </CardFooter>
  );
}
