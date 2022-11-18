import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import * as ProductService from "./product.actions";
import * as Util from "../../util/helper";

export const initialState: ProductState = Object.freeze({
  status: "idle",
  // categories: [],
  products: [],
  recentproducts: [],
  latestproducts: [],
  wishListproducts: [],
  paging: { pageNumber: 1, pageSize: 10 },
  approvedProductId: BigInt(0),
  likedProductId: BigInt(0),
  wishedProductId: BigInt(0),
  error: "",
});

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearProductStateError: (state) => {
      state.error = "";
    },
    clearProductStateStatus: (state) => {
      state.status = "idle";
    },
    clearProductState: (state) => {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(ProductService.createProduct.pending, (state) => {
      state.status = "createProductPending";
      state.error = "";
    });
    builder.addCase(ProductService.createProduct.fulfilled, (state) => {
      state.status = "createProductResolved";
      state.error = "";
    });
    builder.addCase(
      ProductService.createProduct.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "createProductRejected";
      }
    );

    builder.addCase(ProductService.updateProduct.pending, (state) => {
      state.status = "createProductPending";
      state.error = "";
    });
    builder.addCase(ProductService.updateProduct.fulfilled, (state) => {
      state.status = "createProductResolved";
      state.error = "";
    });
    builder.addCase(
      ProductService.updateProduct.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "createProductRejected";
      }
    );

    builder.addCase(ProductService.fetchProductsForSell.pending, (state) => {
      state.status = "fetchProductsForSellPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.fetchProductsForSell.fulfilled,
      (state, { payload }) => {
        state.status = "fetchProductsForSellResolved";

        state.products = Util.fill(payload.result);

        state.paging = payload.paging;

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchProductsForSell.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchProductsForSellRejected";
      }
    );

    builder.addCase(ProductService.fetchUserProducts.pending, (state) => {
      state.status = "fetchUserProductsPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.fetchUserProducts.fulfilled,
      (state, { payload }) => {
        state.status = "fetchUserProductsResolved";

        state.products = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchUserProducts.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchUserProductsRejected";
      }
    );

    builder.addCase(ProductService.fetchAllProducts.pending, (state) => {
      state.status = "fetchAllProductsPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.fetchAllProducts.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllProductsResolved";

        // console.log(JSON.stringify(payload.result));

        state.products = Util.fill(payload.result);

        state.paging = payload.paging;

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchLatestProducts.fulfilled,
      (state, { payload }) => {
        state.status = "fetchAllProductsResolved";

        state.latestproducts = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchAllProducts.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchAllProductsRejected";
      }
    );

    builder.addCase(ProductService.fetchRecentlyViewedList.pending, (state) => {
      state.status = "fetchRecentlyViewedListPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.fetchRecentlyViewedList.fulfilled,
      (state, { payload }) => {
        state.status = "fetchRecentlyViewedListResolved";

        state.recentproducts = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchRecentlyViewedList.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchRecentlyViewedListRejected";
      }
    );

    builder.addCase(ProductService.fetchProductsWishList.pending, (state) => {
      state.status = "fetchProductsWishListPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.fetchProductsWishList.fulfilled,
      (state, { payload }) => {
        state.status = "fetchProductsWishListResolved";

        state.wishListproducts = Util.fill(payload);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.fetchProductsWishList.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "fetchProductsWishListRejected";
      }
    );

    builder.addCase(ProductService.addLikes.pending, (state) => {
      state.status = "addLikesPending";
      state.error = "";
    });
    builder.addCase(ProductService.addLikes.fulfilled, (state, payload) => {
      state.status = "addLikesResolved";

      state.likedProductId = BigInt(payload.meta.arg);

      state.error = "";
    });
    builder.addCase(
      ProductService.addLikes.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "addLikesRejected";
      }
    );

    builder.addCase(ProductService.addToWishList.pending, (state) => {
      state.status = "addToWishListPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.addToWishList.fulfilled,
      (state, payload) => {
        state.status = "addToWishListResolved";

        state.wishedProductId = BigInt(payload.meta.arg);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.addToWishList.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "addToWishListRejected";
      }
    );

    builder.addCase(ProductService.approveProduct.pending, (state) => {
      state.status = "approveProductPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.approveProduct.fulfilled,
      (state, action) => {
        state.status = "approveProductResolved";

        state.approvedProductId = BigInt(action.meta.arg);

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.approveProduct.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "approveProductRejected";
      }
    );

    builder.addCase(ProductService.rejectProduct.pending, (state) => {
      state.status = "rejectProductPending";
      state.error = "";
    });
    builder.addCase(
      ProductService.rejectProduct.fulfilled,
      (state, { payload }) => {
        state.status = "rejectProductResolved";

        state.error = "";
      }
    );
    builder.addCase(
      ProductService.rejectProduct.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = Util.parseErrorMessage(payload);

        state.status = "rejectProductRejected";
      }
    );

    builder.addCase(
      ProductService.fetchSingleProduct.fulfilled,
      (state, { payload }) => {
        state.status = "fetchSingleProductResolved";

        // state.products = Util.fill(payload);
        // payload.likes = BigInt(10);

        state.products = state.products.map((product) =>
          product?.id! === payload?.id! ? { ...product, ...payload } : product
        );

        const findProdIndex = state.products.findIndex(
          (prod) => prod?.id === payload.id
        );

        state.products[findProdIndex] = payload;

        state.error = "";
      }
    );
  },
});

export const {
  clearProductStateError,
  clearProductStateStatus,
  clearProductState,
} = productSlice.actions;

export default productSlice.reducer;
