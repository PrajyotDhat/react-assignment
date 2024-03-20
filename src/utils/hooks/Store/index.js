import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { authApi } from "../Services/Apis/authApi";
import modalSlice from "../Slices/modalSlice";

export const store = configureStore({
	reducer: {
		// [authApi.reducerPath]: authApi.reducer,
		modal: modalSlice,
	},

	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ })
			// .concat(authApi.middleware)
	},
});

setupListeners(store.dispatch);
export * from "../Slices/modalSlice";
