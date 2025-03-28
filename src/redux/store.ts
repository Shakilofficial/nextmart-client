/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishListSlice";
import { couponMiddleware } from "./middleware/coupon.middleware";
import storage from "./storage";

// Persist options for cart
const persistCartConfig = {
  key: "cart",
  storage,
};

// Persist options for wishlist
const persistWishlistConfig = {
  key: "wishlist",
  storage,
};

// Persisted reducers
const persistedCart = persistReducer(persistCartConfig, cartReducer);
const persistedWishlist = persistReducer(
  persistWishlistConfig,
  wishlistReducer
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedCart,
      wishlist: persistedWishlist,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(couponMiddleware),
  });
};

// Infer store types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
