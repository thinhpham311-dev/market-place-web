export interface IOption {
    label: string;
    value: string | Array<IOption>
}

export interface IProduct {
    _id: string,
    product_name?: string,
    article?: string,
    description?: string,
    options?: Array<{ label: string; value: IOption[] }>; // Đánh dấu "options" là tùy chọn
    image?: string,
    product_price: number,
    discountPrice: number,
    quantity: number,
}

export interface IReview {
    rating: number;
    comment: string;
    user: string;
}

export interface IProductfilter {
    limit?: number;
    sort?: string;
    page?: number;
    filter?: IProduct;
}