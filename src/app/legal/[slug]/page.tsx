import { notFound } from "next/navigation";
import FooterPageView from "@/features/footer-pages/FooterPageView";
import { legalPages } from "@/features/footer-pages/content";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const page = legalPages[params.slug];

  if (!page) {
    notFound();
  }

  return <FooterPageView page={page} />;
}
