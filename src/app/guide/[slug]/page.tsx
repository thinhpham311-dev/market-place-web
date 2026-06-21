import { notFound } from "next/navigation";
import FooterPageView from "@/features/footer-pages/FooterPageView";
import { guidePages } from "@/features/footer-pages/content";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const page = guidePages[params.slug];

  if (!page) {
    notFound();
  }

  return <FooterPageView page={page} />;
}
