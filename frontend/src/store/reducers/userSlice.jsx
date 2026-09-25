import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  isInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loaduser: (state, action) => {
      state.users = action.payload;
      state.isInitialized = true;
    },

    removeuser: (state) => {
      state.users = null;
      state.isInitialized = true;
    },
  },
});

export default userSlice.reducer;

export const { loaduser, removeuser } = userSlice.actions;