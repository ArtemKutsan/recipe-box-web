import { clearCredentials } from '@/entities/auth';
import { mealPlansApi } from '@/entities/meal-plan';

// Очищаем пользовательские данные других доменов при любом сценарии завершения сессии.
export const sessionCleanupMiddleware = (store) => (next) => (action) => {
  const shouldClearSession = clearCredentials.match(action);
  const result = next(action);

  if (shouldClearSession) {
    store.dispatch(mealPlansApi.util.resetApiState());
  }

  return result;
};
