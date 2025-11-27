import { Card } from "@/components/ui";

const MainCartContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card className='border-none shadow-none grid grid-cols-12'>
            {children}
        </Card>
    );
};

export default MainCartContainer;
