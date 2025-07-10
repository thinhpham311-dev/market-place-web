import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostProductsListByCategories } from '@/services/ProductService'
import { apiPostCategoryDetail } from "@/services/CategoryService"
import { IProductfilter, IProduct } from '@/interfaces/product';
import { ICategory } from '@/interfaces/category';

export const getProductListByCategories = createAsyncThunk<IProduct[], IProductfilter>('productListByCategories/data/getList', async (data: IProductfilter) => {
    const response = await apiPostProductsListByCategories(data) as { data: IProduct[] };
    return response.data;
});

export const getCategoryDetail = createAsyncThunk<ICategory, ICategory>(
    'productListByCategories/data/getDetail',
    async (data) => {
        const response = await apiPostCategoryDetail(data) as { data: ICategory };
        return response.data;
    }
);

const dataSlice = createSlice({
    name: 'productListByCategories/data',
    initialState: {
        loading: false,
        detail: null,
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoryDetail.fulfilled, (state: { detail: ICategory | null; loading: boolean }, action: { payload: any }) => {
                state.detail = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getCategoryDetail.rejected, (state) => {
                state.loading = false;
                state.detail = null;
            })
            .addCase(getProductListByCategories.fulfilled, (state: { list: IProduct[]; loading: boolean }, action: { payload: any }) => {
                state.list = action.payload.metadata;
                state.loading = false;
            })
            .addCase(getProductListByCategories.pending, (state: { loading: boolean }) => {
                state.loading = true;
            })
            .addCase(getProductListByCategories.rejected, (state: { list: IProduct[]; loading: boolean }) => {
                state.loading = false;
                state.list = [];
            });
    }
});

export default dataSlice.reducer