import React from 'react';
import { ThemeProvider } from 'styled-components'
import { theme } from '@adminjs/design-system'


const DashboardComponent = () => {
    return <ThemeProvider theme={theme}>
        Dashboard
    </ThemeProvider>
};

export default DashboardComponent;
