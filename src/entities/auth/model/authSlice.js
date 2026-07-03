import { createSlice } from '@reduxjs/toolkit';
import { readStoredToken, removeToken, saveToken } from './storage';

const initialState = {
  token: readStoredToken(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
      saveToken(token);
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    clearCredentials(state) {
      state.token = null;
      state.user = null;
      removeToken();
    },
  },
});

export const { setCredentials, setCurrentUser, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
