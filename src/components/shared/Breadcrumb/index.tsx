'use client';

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui';
import { Tally1 } from 'lucide-react';
import BreadcrumbLinkItem from './components/BreadcrumbLinkItem';
import { Warehouse, ArrowDownToLine } from 'lucide-react';

export const breadcrumbItems = [
    {
        label: 'Seller Centre',
        href: '/admin',
        icon: Warehouse,
    },
    {
        label: 'Download',
        href: '/admin/download',
        icon: ArrowDownToLine,
    },
];

export default function AdminBreadcrumb() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <div key={item.href} className="flex items-center">
                        <BreadcrumbLinkItem
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                        />
                        {index < breadcrumbItems.length - 1 && (
                            <BreadcrumbSeparator>
                                <Tally1 className="ml-0 -mr-2" size={12} />
                            </BreadcrumbSeparator>
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
