import VoucherListRoot from "@/features/voucher/list/voucher-list-root";

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
    <VoucherListRoot
      shopId={getSingleValue(searchParams?.shopId)}
      limit={getSingleValue(searchParams?.limit)}
      page={getSingleValue(searchParams?.page)}
    />
  );
}
