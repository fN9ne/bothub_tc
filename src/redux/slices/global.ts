import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Lang {
	Ru = "ru",
	En = "en",
	Es = "es",
	De = "de",
}

interface GlobalState {
	lang: Lang;
}

const initialState: GlobalState = {
	lang: Lang.Ru,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setLang(state, action: PayloadAction<Lang>) {
			state.lang = action.payload;
		},
	},
});

export default globalSlice;
