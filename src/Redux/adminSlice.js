import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",

  initialState: {
    currentAdmin: "admin here",
  },

  reducers: {
    adminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
    },

    adminSignOut: (state) => {
      state.currentAdmin = null;
    },
  },
});

export const { adminSuccess, adminSignOut } = adminSlice.actions;

export default adminSlice.reducer;
