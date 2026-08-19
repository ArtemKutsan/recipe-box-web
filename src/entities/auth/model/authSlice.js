import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    clearCredentials(state) {
      state.user = null;
    },
  },
});

export const { setCurrentUser, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
