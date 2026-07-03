export const selectAuthToken = (state) => state.auth.token;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
