import dynamic from "next/dynamic";
import { notFound } from "next/navigation"; // ✅ import notFound
// import CatByCategoryId from "@/features/category/by-category-id";
// import ProListByCategoryId from "@/features/product/list/by-category-id";
import { Skeleton } from "@/components/ui/skeleton";

const CatByCategoryId = dynamic(() => import("@/features/category/list/by-category-id"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-10" />,
});
const ProListByCategoryId = dynamic(() => import("@/features/product/list/by-category-id"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-lvh" />,
});

interface PageProps {
  params: { segments?: string[] };
}

export default function Page({ params }: PageProps) {
  const fullSlug = params?.segments?.join("/") || "";

  const match = fullSlug.match(/(.*)-cat\.([\w.]+)/);

  if (!match) {
    notFound();
  }

  // ✅ Lấy các id
  const ids = match![2].split(".");
  const lastId = ids.at(-1);

  if (!lastId) {
    notFound();
  }

  return (
    <div className="space-y-5 container mx-auto my-5">
      <CatByCategoryId ids={ids} />
      <ProListByCategoryId lastId={lastId} />
    </div>
  );
}
