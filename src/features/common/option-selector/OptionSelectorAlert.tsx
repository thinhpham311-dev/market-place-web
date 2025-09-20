import React from 'react';
import { Alert, AlertDescription } from '@/components/ui';
import { useOptionSelectorContext } from './hooks';



const OptionSelectorAlert = () => {
    const { sku_tier_idx, optionsCount } = useOptionSelectorContext()


    return (<>
        {
            Array.isArray(sku_tier_idx) && sku_tier_idx.length !== optionsCount && <Alert variant="destructive">
                <AlertDescription>
                    Please select all required options before adding this product to your cart.                    </AlertDescription>
            </Alert>
        }
    </>
    );
};

export default OptionSelectorAlert;
