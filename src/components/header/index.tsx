import { Navbar } from '@/components/ui/navbar';

export default function SiteHeader() {
  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4">
        <Navbar />
      </div>
    </header>
  );
}