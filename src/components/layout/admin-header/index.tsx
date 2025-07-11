// components/layout/AdminHeader.tsx
import { NotificationDropdown, LanguageSwitcher, AdminBreadcrumb } from '@/components/shared';

export default function AdminHeader() {
    return (
        <header className=" border-b ">
            <div className='flex items-center justify-between px-6 py-1 bg-background container mx-auto'>
                <AdminBreadcrumb />
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <NotificationDropdown />
                </div>
            </div>
        </header>
    );
}
