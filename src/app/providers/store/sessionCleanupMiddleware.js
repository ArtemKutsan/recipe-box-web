import { clearCredentials } from '@/entities/auth';
import { mealPlansApi } from '@/entities/meal-plan';
import { clearFavorites, favoritesApi } from '@/entities/favorite';

// Очищаем пользовательские данные других доменов при любом сценарии завершения сессии.
export const sessionCleanupMiddleware = (store) => (next) => (action) => {
  const shouldClearSession = clearCredentials.match(action);
  const result = next(action);

  if (shouldClearSession) {
    store.dispatch(mealPlansApi.util.resetApiState());
    store.dispatch(clearFavorites());
    store.dispatch(favoritesApi.util.resetApiState());
  }

  return result;
};
