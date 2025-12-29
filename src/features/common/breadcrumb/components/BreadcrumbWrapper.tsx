import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";

// ✅ Render helpers
const BreadcrumbWrapper = ({ children }: { children?: React.ReactNode }) => (
  <Breadcrumb>
    <BreadcrumbList>{children}</BreadcrumbList>
  </Breadcrumb>
);

export default BreadcrumbWrapper;
