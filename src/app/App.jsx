import AuthSessionProvider from '@/app/providers/auth/AuthSessionProvider';
import FavoritesSessionProvider from '@/app/providers/favorites/FavoritesSessionProvider';
import AppRouter from '@/app/providers/router/AppRouter';
import SocketIoProvider from '@/app/providers/socket-io/SocketIoProvider';
import './styles/App.css';

function App() {
  return (
    <AuthSessionProvider>
      <SocketIoProvider>
        <FavoritesSessionProvider>
          <AppRouter />
        </FavoritesSessionProvider>
      </SocketIoProvider>
    </AuthSessionProvider>
  );
}

export default App;
