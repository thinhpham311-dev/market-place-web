import VoucherListPage from "@/features/voucher/list";

interface PageProps {
  searchParams?: {
    shopId?: string | string[];
    limit?: string | string[];
    page?: string | string[];
  };
}

const getSingleValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function Page({ searchParams }: PageProps) {
  return (
    <VoucherListPage
      shopId={getSingleValue(searchParams?.shopId)}
      limit={getSingleValue(searchParams?.limit)}
      page={getSingleValue(searchParams?.page)}
    />
  );
}
