import Sidebar from '@/widgets/Sidebar';
import TopBar from '@/widgets/TopBar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopBar />
        <main className="px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
