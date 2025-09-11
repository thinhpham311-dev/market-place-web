import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';
import { type ButtonProps } from '@/components/ui/button';

const LanguageButton = forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {
    return (
        <Button ref={ref} variant="ghost" size="icon" {...props}>
            <Globe className="w-5 h-5" />
        </Button>
    );
});

LanguageButton.displayName = 'LanguageButton';
export default LanguageButton;
