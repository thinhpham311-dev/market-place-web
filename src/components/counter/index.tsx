import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Counter = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => Math.max(0, prev - 1));

    return (
        <Card className="mx-auto border-none">
            <CardContent className="flex flex-col items-center space-y-4">
                <Input
                    type="number"
                    value={count}
                    readOnly
                    className="text-center w-20 text-lg"
                />
                <div className="flex space-x-4">
                    <Button onClick={decrement} variant="outline">
                        -
                    </Button>
                    <Button onClick={increment} variant="outline">
                        +
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Counter;
