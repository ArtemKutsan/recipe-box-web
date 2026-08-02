import { isRejectedWithValue } from '@reduxjs/toolkit';
import { clearCredentials } from '@/entities/auth';
import { RouterPath } from '@/shared/config/routerPaths';

const authEndpoints = new Set(['login', 'register']);

export const apiErrorMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status ?? action.error?.status;
    const endpointName = action.meta?.arg?.endpointName;

    if (status === 401 && !authEndpoints.has(endpointName)) {
      // Общая политика сессии: при 401 сбрасываем auth state и уводим на логин.
      store.dispatch(clearCredentials());

      // TODO: отдельный navigation service/adapter чтобы убрать прямой window из middleware?
      if (window.location.pathname !== RouterPath.auth) {
        window.location.replace(RouterPath.auth);
      }
    }
  }

  return next(action);
};
