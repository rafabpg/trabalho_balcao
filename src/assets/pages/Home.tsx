import React, { useEffect, useState } from 'react';
import WelcomeBanner from '@/components/Organisms/WelcomeBanner';
import SearchAndFilterBar from '@/components/Organisms/SearchAndFilterBar';
import AdCard from '@/components/Organisms/AdCard';
import Pagination from '@/components/Molecules/Pagination';

interface Ad {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  adTitle: string;
  adDate: string;
  adImage: string;
  location: string;
  category: string;
  price: string;
}

const Home: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;

  // Simulação de chamada ao backend para buscar anúncios
  useEffect(() => {
    // Implementar API de busca de anúncios quando estiver pronto.

    // Dados simulados
    const mockAds: Ad[] = Array.from({ length: 50 }, (_, i) => ({
      id: (i + 1).toString(),
      userName: 'Jão Pernalonga',
      userImage: 'https://via.placeholder.com/150',
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      adTitle: `Título do Anúncio ${i + 1}`,
      adDate: '20 de out. de 2024',
      adImage: 'https://via.placeholder.com/300',
      location: `Localização ${String.fromCharCode(65 + (i % 5))}`,
      category: ['Livros', 'Eletrônicos', 'Móveis', 'Roupas', 'Brinquedos'][i % 5],
      price: `R$ ${(Math.random() * 100).toFixed(2)}`,
    }));

    setAds(mockAds);
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfFirstAd + adsPerPage);

  const totalPages = Math.ceil(ads.length / adsPerPage);

  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar />
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {currentAds.map((ad) => (
              <AdCard
                key={ad.id}
                userName={ad.userName}
                userImage={ad.userImage}
                rating={ad.rating}
                adTitle={ad.adTitle}
                adDate={ad.adDate}
                adImage={ad.adImage}
                location={ad.location}
                category={ad.category}
                price={ad.price}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
