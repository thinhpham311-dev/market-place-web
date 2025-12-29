import BreadcrumbWrapper from "./components/BreadcrumbWrapper";
import BreadcrumbItemsList from "./components/BreadcrumbItems";
import BreadcrumbProvider from "./providers";
import { BreadcrumbItem } from "./types";

interface IBreadcrumbProps {
  items?: BreadcrumbItem[] | BreadcrumbItem;
  isDisableLast?: boolean;
  getHref: (item: BreadcrumbItem) => string;
  getLabel: (item: BreadcrumbItem) => string;
}

// ✅ Render helpers
const Breadcrumb = ({ ...props }: IBreadcrumbProps) => {
  return (
    <BreadcrumbProvider contextValues={{ ...props }}>
      <BreadcrumbWrapper>
        <BreadcrumbItemsList />
      </BreadcrumbWrapper>
    </BreadcrumbProvider>
  );
};

export default Breadcrumb;
