export const selectAuthUser = (state) => state.auth.user;
// Пользователь считается вошедшим после успешной проверки backend-сессии.
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
