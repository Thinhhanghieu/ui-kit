import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tTheme } from "../../types/common.type";

export const THEME = {
	dark: "dark",
	light: "light",
} as const;

export interface ITheme {
	theme: tTheme;
}
const initialState: ITheme = {
	theme: THEME.light,
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<tTheme>) => {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;