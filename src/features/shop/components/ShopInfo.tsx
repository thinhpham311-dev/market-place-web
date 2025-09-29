import React from 'react';

interface ShopInfoProps {
    name: string;
    description: string;
    location: string;
}

const ShopInfo: React.FC<ShopInfoProps> = ({ name, description, location }) => {
    return (
        <div className="shop-info">
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Location: {location}</p>
        </div>
    );
};

export default ShopInfo;
