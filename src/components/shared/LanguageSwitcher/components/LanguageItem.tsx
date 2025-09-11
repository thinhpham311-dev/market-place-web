'use client';

import { useRouter, usePathname } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface Props {
    locale: string;
    label: string;
    currentLang: string;
}

export default function LanguageItem({ locale, label, currentLang }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const handleChangeLanguage = () => {
        const newPath = `/${locale}${pathname}`;
        router.push(newPath);
    };

    return (
        <DropdownMenuItem onSelect={handleChangeLanguage} disabled={locale === currentLang}>
            {label}
        </DropdownMenuItem>
    );
}
