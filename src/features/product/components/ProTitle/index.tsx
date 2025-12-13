"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton"
import NotFound from "./NotFound"

export default function ProTitle() {
    const { spu, loading, error } = useSpuContext();
    const hasNoData = !spu || Object.keys(spu).length === 0;
    if (loading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!loading && hasNoData && error) {
        return <NotFound message={error || "Something went wrong."} />;
    }

    if (!loading && hasNoData) {
        return <NotFound />;
    }
    const name = spu?.product_name ?? "";

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-3">
                <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            </CardContent>
        </Card>
    );
}
