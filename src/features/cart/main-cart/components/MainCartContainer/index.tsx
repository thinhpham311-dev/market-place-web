import { Card } from "@/components/ui";

const MainCartContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card className='border-none shadow-none'>
            {children}
        </Card>
    );
};

export default MainCartContainer;
