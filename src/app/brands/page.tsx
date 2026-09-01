import BrandListPage from "@/features/brand/list/all";

interface PageProps {
  searchParams?: {
    search?: string | string[];
    category_id?: string | string[];
    limit?: string | string[];
    page?: string | string[];
  };
}

const getSingleValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <div className="mx-auto">
      <BrandListPage
        titleKey="all_brands"
        descriptionKey="all_brands_desc"
        compact={false}
        logoOnly={false}
        showSeeMore={false}
        countLoadItems={12}
        initialSearch={getSingleValue(searchParams?.search)}
        initialCategoryId={getSingleValue(searchParams?.category_id)}
      />
    </div>
  );
}
