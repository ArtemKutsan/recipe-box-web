import Sidebar from '@/widgets/Sidebar';
import TopBar from '@/widgets/TopBar';
import Footer from '@/widgets/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
