type Option = {
    label: string;
    value: string | Array<Option>
}

export type Product = {
    _id: string,
    product_id?: string
    product_name?: string,
    product_shop?: string,
    product_category?: string[],
    article?: string,
    product_description?: string,
    options?: Array<{ label: string; value: Option[] }>; // Đánh dấu "options" là tùy chọn
    image?: string,
    product_price: number,
    product_slug: string,
    product_brand?: string,
    // discountPrice: number,
    quantity: number,
}



export type Productfilter = {
    ids?: Array<string> | string;
    limit?: number;
    sort?: string;
    page?: number;
    filter?: Product;
    search?: string;
}