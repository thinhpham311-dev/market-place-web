
import {
    Card,
    CardContent
} from "@/components/ui/card"
import Item from './item'

export function MobileCard() {
    return (
        <Card className="md:col-span-2 col-span-6">
            <CardContent className="p-3">
                <Item label="Total">
                    <strong>83.99</strong>
                </Item>
            </CardContent>
        </Card>
    )
}

export default MobileCard