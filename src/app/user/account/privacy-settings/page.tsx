//ui
import { Button, Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui";

//icons
import { Delete } from "lucide-react";

export default function Page() {
    return (
        <div className=" container  md:p-6 p-3">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Privacy Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row justify-between items-center">
                    <CardDescription>
                        <span>Request Account Deletion</span>
                    </CardDescription>
                    <Button variant="outline" ><Delete />Delete</Button>
                </CardContent>
            </Card>
        </div>
    );
}


