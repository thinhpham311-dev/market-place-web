import React, { useState } from 'react';

const ShopTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('products');

    const tabs = [
        { id: 'products', label: 'Products' },
        { id: 'categories', label: 'Categories' },
        { id: 'offers', label: 'Offers' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return <div>Product List</div>;
            case 'categories':
                return <div>Category List</div>;
            case 'offers':
                return <div>Offer List</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <ul className="tabs">
                {tabs.map(tab => (
                    <li key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? 'active' : ''}>
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ShopTabs;
