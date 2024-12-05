import { Navbar } from './components/navbar';

export default function SiteHeader() {
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="flex h-14 items-center md:px-12 px-6">
        <Navbar />
      </div>
    </header>
  );
}