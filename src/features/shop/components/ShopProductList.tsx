import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ShopProductListProps {
    products: Product[];
}

const ShopProductList: React.FC<ShopProductListProps> = ({ products }) => {
    return (
        <div>
            <h2>Shop Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShopProductList;
