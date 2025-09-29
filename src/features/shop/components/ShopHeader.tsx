"use client"

import React from 'react';
import Link from 'next/link';

const ShopHeader: React.FC = () => {
    return (
        <header>
            <h1>Shop Header</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default ShopHeader;
