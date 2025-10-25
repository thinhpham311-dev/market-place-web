"use client"
import React from 'react';

//ui
import { Card } from '@/components/ui';

import MainCartHeader from './components/MainCartHeader';
import MainCartContent from './components/MainCartContent';

const MainCart = () => {

    return (
        <Card className='border-none shadow-none'>
            <MainCartHeader />
            <MainCartContent />
        </Card>
    );
};

export default MainCart;
