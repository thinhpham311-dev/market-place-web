"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react"

interface ICounterProps {
    isButtonAdd?: boolean
}

const Counter = ({ isButtonAdd }: ICounterProps) => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => Math.max(0, prev - 1));

    return (
        <Card className=" border-none w-[100px] ">
            <CardContent className="flex flex-row items-center space-x-1 p-0">
                {isButtonAdd && count === 0 ? <Button className="uppercase" variant="outline" size="sm" onClick={increment}>Add to Cart</Button> : <>
                    <Button onClick={decrement} size="icon" variant="outline" className="w-[25px] h-[25px] rounded-xl">
                        <Minus />
                    </Button>
                    <Input
                        type="text"
                        value={count}
                        readOnly
                        className="text-center text-lg flex-1 w-[30px] h-[30px] "
                    />
                    <Button onClick={increment} size="icon" variant="outline" className="w-[25px] h-[25px] rounded-xl">
                        <Plus />
                    </Button>
                </>
                }
            </CardContent>
        </Card>
    );
};

export default Counter;
