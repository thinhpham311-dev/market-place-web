import React from "react";
import SpuCard from "../ProCard";
import { ISpuPro } from "@/interfaces/spu";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

interface SpuGridProps {
    data: ISpuPro[];
    className?: string;
    isLoading: boolean;
    error?: Error | null;
    countLoadItems?: number;
}

const ProGrid = ({
    data,
    className,
    isLoading,
    error,
    countLoadItems = 12,
}: SpuGridProps) => {
    // switch (status) {
    //     case "loading":
    //         return <Loading className={className} count={countLoadItems} />;

    //     case "error":
    //         return <NotFound message={error?.message || "Something went wrong."} />;

    //     case "empty":
    //         return <NotFound message="No products found." />;

    //     case "success":
    //         return (
    //             <div className={cn("grid w-full", className)}>
    //                 {data.map((item) => (
    //                     <SpuCard key={item.product_id} item={item} isLoading={false} />
    //                 ))}
    //             </div>
    //         );

    //     case "idle":
    //     default:
    //         return null;
    // }

    const hasNoData = !data || data.length === 0;

    if (isLoading && hasNoData) {
        return <Loading className={className} count={countLoadItems} />;
    }

    if (!isLoading && hasNoData && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (!isLoading && hasNoData) {
        return <NotFound />;
    }
    return (
        <div className={cn("grid w-full", className)}>
            {data.map((item) => (
                <SpuCard key={item.product_id} item={item} isLoading={false} />
            ))}
        </div>
    );


};

export default ProGrid;
