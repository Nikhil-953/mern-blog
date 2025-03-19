import { createSlice } from "@reduxjs/toolkit";

// Load the theme from localStorage if available
const storedTheme = localStorage.getItem("theme");

const initialState = {
  theme: storedTheme || "light", // ✅ Use stored theme if available
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // ✅ Save theme to localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
