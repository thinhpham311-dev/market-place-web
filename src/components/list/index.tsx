import React from "react";
import { GridList, CarouselList, RowList } from "./components"
import { IProduct } from "@/types/product";

interface IListProps {
    type?: string,
    title?: string,
    article?: string,
    data: Array<IProduct>
}

const List = ({ title, article, data, type }: IListProps) => {
    return <>{(() => {
        switch (type) {
            case "carousel":
                return <CarouselList title={title} article={article} data={data} />;
            case "grid":
                return <GridList title={title} data={data} />;
            case "row":
                return <RowList title={title} data={data} />;
            default:
                return <div>Default Component</div>;
        }
    })()}</>;
};

export default List;
