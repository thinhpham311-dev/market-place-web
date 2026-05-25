import SearchPageContent from "@/features/product/list/search-image";

interface PageProps {
  searchParams?: {
    keyword?: string | string[];
    imageName?: string | string[];
    imageSearch?: string | string[];
  };
}

const getSingleValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <SearchPageContent
      keyword={getSingleValue(searchParams?.keyword)}
      imageName={getSingleValue(searchParams?.imageName)}
      imageSearch={getSingleValue(searchParams?.imageSearch)}
    />
  );
}
