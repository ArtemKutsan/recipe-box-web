import AuthSessionProvider from '@/app/providers/auth/AuthSessionProvider';
import FavoritesSessionProvider from '@/app/providers/favorites/FavoritesSessionProvider';
import AppRouter from '@/app/providers/router/AppRouter';
import './styles/App.css';

function App() {
  return (
    <AuthSessionProvider>
      <FavoritesSessionProvider>
        <AppRouter />
      </FavoritesSessionProvider>
    </AuthSessionProvider>
  );
}

export default App;
