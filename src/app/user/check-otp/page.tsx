import CheckOtpCard from "@/features/auth/check-otp/components/CheckOtpCard";

interface PageProps {
  searchParams?: {
    email?: string | string[];
  };
}

const getEmailFromSearchParams = (email?: string | string[]) => {
  return Array.isArray(email) ? (email[0] ?? "") : (email ?? "");
};

export default function Page({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto p-3 md:p-6">
      <CheckOtpCard email={getEmailFromSearchParams(searchParams?.email)} />
    </div>
  );
}
