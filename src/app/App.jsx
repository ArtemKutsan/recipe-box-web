import Sidebar from '@/widgets/Sidebar';
import TopBar from '@/widgets/TopBar';
import AuthSessionProvider from '@/app/providers/auth/AuthSessionProvider';
import AppRouter from '@/app/providers/router/AppRouter';
import './styles/App.css';

function App() {
  return (
    <AuthSessionProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar />
          <main className="px-4 py-6 md:px-6">
            <AppRouter />
          </main>
        </div>
      </div>
    </AuthSessionProvider>
  );
}

export default App;
