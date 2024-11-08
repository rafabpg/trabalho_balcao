import Header from '@/components/Organisms/Header';
import Footer from '@/components/Organisms/Footer';
import { Outlet } from 'react-router';

const LayoutTemplate = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default LayoutTemplate;
