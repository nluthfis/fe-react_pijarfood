import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    storeRecipes: (state, action) => {
      state.data = action.payload;
    },
    reset: () => initialState,
  },
});

export const { storeRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
