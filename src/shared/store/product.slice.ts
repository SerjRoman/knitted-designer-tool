import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
	id: number | null;
	name: string | null;
	description: string | null;
	imageId: number | null;
	tags: string[] | null;
}
interface ProductState {
	product: Product;
}

const initialState: ProductState = {
	product: {
		id: null,
		name: null,
		description: null,
		imageId: null,
		tags: null,
	},
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProduct(state, { payload }: PayloadAction<Product>) {
			state.product = payload;
		},
		setProductId(state, { payload }: PayloadAction<number>) {
			if (state.product) {
				state.product.id = payload;
			}
		},
		resetProduct(state) {
			state.product = initialState.product;
		},
	},
});
export const { setProduct, setProductId, resetProduct } = productSlice.actions;
