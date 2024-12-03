
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Item from "./item"

export function DecktopCard() {
    return (
        <Card className="md:col-span-2 col-span-6 relative flex flex-col justify-between gap-y-3 p-3">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Item label="Subtotal">
                        <span>83.99</span>
                    </Item>
                    <Item label="Estimated Delivery & Handling">
                        <span>83.99</span>
                    </Item>
                </CardContent>
            </Card>
            <CardFooter className="border rounded-sm py-3">
                <Item label="Total">
                    <strong>83.99</strong>
                </Item>
            </CardFooter>
        </Card>
    )
}

export default DecktopCard