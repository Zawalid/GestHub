import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const getTheme = () => {
  const theme = window.localStorage.getItem("theme");
  if (theme) return theme;
  return getSystemTheme();
};

const initialState = {
  theme: getTheme(),
  user: {
    role: "admin",
    name: "John Doe",
    email: "john.doe@gmail.com",
  },
};

const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    changeTheme(state, action) {
      state.theme = action.payload;
      window.localStorage.setItem("theme", action.payload);

      const theme =
        action.payload === "system" ? getSystemTheme() : action.payload;

      document.documentElement.className = `${theme} theme-transition`;
      setTimeout(
        () => document.documentElement.classList.remove("theme-transition"),
        400
      );
    },
  },
});

export const { changeTheme } = appSlice.actions;
export default appSlice.reducer;
