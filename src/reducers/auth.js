import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateUserPhoto: (state, action) => {
      if (state.auth) {
        state.auth.data[0].photo = action.payload;
      }
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuth, updateUserPhoto, logout } = authSlice.actions;

export default authSlice.reducer;
