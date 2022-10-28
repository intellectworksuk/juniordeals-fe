import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import productReducer from "./product/product.slice";
import dealReducer from "./deal/deal.slice";
import firestoreReducer from "./firestore/firestore.slice";
import configReducer from "./config/config.slice";
import transactionReducer from "./transaction/transaction.slice";
import adminReducer from "./admin/admin.slice";
import quizReducer from "./quiz/quiz.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  product: productReducer,
  deal: dealReducer,
  firestore: firestoreReducer,
  config: configReducer,
  transaction: transactionReducer,
  admin: adminReducer,
  quiz: quizReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

export const persistor = persistStore(store);
