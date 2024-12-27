"use client"
import * as React from "react";

//components
import { Button, Label } from "@/components/ui/atoms";
import { OptionsListOfTab } from "./OptionsListOfTab";
import { Card, CardContent } from "@/components/ui/molecules";

export default function FilterBar() {
    return (
        <Card className="flex flex-row flex-wrap items-center justify-between mb-5">
            <CardContent className="p-3 flex items-center gap-3">
                <Label>Result:</Label>
                <strong>Pants</strong>
                <Button variant="outline">Clear</Button>
            </CardContent>
            <CardContent className="p-3 flex items-center gap-3">
                <OptionsListOfTab
                    label="Sort"
                    className="mb-0 flex items-center gap-3"
                    data={[
                        { label: "Newest", value: "newest" },
                        { label: "Lowest", value: "lowest" },
                        { label: "Highest", value: "highest" },
                        { label: "Rating", value: "rating" }
                    ]}
                />
            </CardContent>
        </Card>
    )
};
