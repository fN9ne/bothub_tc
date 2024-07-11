import { combineReducers, configureStore } from "@reduxjs/toolkit";

import globalSlice from "./slices/global";

const rootReducer = combineReducers({
	global: globalSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
