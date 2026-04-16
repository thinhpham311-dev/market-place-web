import BrandListPage from "@/features/brand/list/all";

export default function Page() {
  return (
    <div className="container mx-auto my-5">
      <BrandListPage
        titleKey="all_brands"
        descriptionKey="all_brands_desc"
        compact={false}
        logoOnly={false}
        showSeeMore={false}
        countLoadItems={12}
      />
    </div>
  );
}
