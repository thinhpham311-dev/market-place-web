import FooterPageView from "@/features/footer-pages/FooterPageView";
import { sellerPages } from "@/features/footer-pages/content";

export default function Page() {
  return <FooterPageView page={sellerPages.index} />;
}
