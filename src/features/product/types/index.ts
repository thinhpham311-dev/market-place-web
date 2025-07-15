type Option = {
    label: string;
    value: string | Array<Option>
}

export interface IProduct {
    _id: string,
    product_id?: string
    product_name?: string,
    article?: string,
    product_description?: string,
    options?: Array<{ label: string; value: Option[] }>; // Đánh dấu "options" là tùy chọn
    image?: string,
    product_price: number,
    product_slug: string,
    // discountPrice: number,
    quantity: number,
}

export interface IReview {
    rating: number;
    comment: string;
    user: string;
}

export interface IProductfilter {
    ids?: Array<string> | string;
    limit?: number;
    sort?: string;
    page?: number;
    filter?: IProduct;
}