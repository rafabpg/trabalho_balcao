import React from 'react';
import WelcomeBanner from '@/components/Organisms/WelcomeBanner';
import SearchAndFilterBar from '@/components/Organisms/SearchAndFilterBar';

const Home: React.FC = () => {
  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Descubra os melhores anúncios</h2>
        <p>Explore nossa plataforma para encontrar o que você precisa.</p>
      </div>
    </div>
  );
};

export default Home;
