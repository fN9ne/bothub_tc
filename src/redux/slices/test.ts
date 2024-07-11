import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TestState {
	count: number;
}

const initialState: TestState = {
	count: 0,
};

const testSlice = createSlice({
	name: "test",
	initialState,
	reducers: {
		increase(state, action: PayloadAction<number>) {
			state.count += action.payload;
		},
		decrease(state, action: PayloadAction<number>) {
			state.count -= action.payload;
		},
	},
});

export default testSlice;
