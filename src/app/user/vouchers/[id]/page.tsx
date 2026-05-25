import VoucherDetailPage from "@/features/voucher/detail";

interface PageProps {
  params: {
    id?: string;
  };
  searchParams?: {
    shopId?: string | string[];
    limit?: string | string[];
    page?: string | string[];
  };
}

const getSingleValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function Page({ params, searchParams }: PageProps) {
  return (
    <VoucherDetailPage
      voucherId={params?.id}
      shopId={getSingleValue(searchParams?.shopId)}
      limit={getSingleValue(searchParams?.limit)}
      page={getSingleValue(searchParams?.page)}
    />
  );
}
