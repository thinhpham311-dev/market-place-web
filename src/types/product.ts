export interface IOption {
    label: string;
    value: string | Array<IOption>;
}
export interface IProduct {
    _id: string,
    name?: string,
    article?: string,
    description?: string,
    options?: Array<IOption>
    image?: string,
    price: number,
    discountPrice: number,
    quantity: number,
}