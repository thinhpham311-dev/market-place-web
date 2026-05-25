import DailyDiscover from "@/features/product/list/daily-discover";

interface PageProps {
  searchParams?: {
    page?: string | string[];
    tab?: string | string[];
  };
}

const getPageFromSearchParams = (page?: string | string[]) => {
  const rawPage = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number(rawPage);

  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

const getTabFromSearchParams = (tab?: string | string[]) => {
  return Array.isArray(tab) ? tab[0] : tab;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <DailyDiscover
      initialPage={getPageFromSearchParams(searchParams?.page)}
      initialTab={getTabFromSearchParams(searchParams?.tab)}
    />
  );
}
