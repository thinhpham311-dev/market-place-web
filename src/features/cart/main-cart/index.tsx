
import React from 'react';

//ui
import MainCartContainer from './components/MainCartContainer';
import MainCartHeader from './components/MainCartHeader';
import MainCartContent from './components/MainCartContent';
import MainCartFooter from './components/MainCartFooter';

const MainCart = () => {

    return (
        <MainCartContainer>
            <MainCartHeader />
            <MainCartContent />
            <MainCartFooter />
        </MainCartContainer>
    );
};

export default MainCart;
