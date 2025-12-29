import { Card } from "@/components/ui/card";

const MainCartContainer = ({ children }: { children: React.ReactNode }) => {
  return <Card className="border-none shadow-none grid grid-cols-12 gap-y-3">{children}</Card>;
};

export default MainCartContainer;
