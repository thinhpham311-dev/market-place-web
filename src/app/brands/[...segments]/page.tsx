import { notFound } from "next/navigation";
import ProListByBrandId from "@/features/product/list/by-brand-id";

export default function Page({ params }: { params: { segments: string[] } }) {
  const fullSlug = params?.segments?.join("/") || "";

  const match = fullSlug.match(/(.*)-b\.([\w.]+)/);

  if (!match) {
    notFound();
  }

  // ✅ Lấy các id
  const ids = match![2].split(".");
  const brand_id = ids.at(-1);

  if (!brand_id) {
    notFound();
  }

  return (
    <div className="container mx-auto my-5">
      
      <ProListByBrandId lastId={brand_id} />
    </div>
  );
}
