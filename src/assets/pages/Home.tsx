import React, { useEffect, useState } from 'react';
import WelcomeBanner from '@/components/Organisms/WelcomeBanner';
import SearchAndFilterBar from '@/components/Organisms/SearchAndFilterBar';
import AdCard from '@/components/Organisms/AdCard';

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

  // Simulação de chamada ao backend para buscar anúncios
  useEffect(() => {
    // Implementar API de busca de anúncios quando estiver pronto.

    // Dados simulados
    const mockAds: Ad[] = [
      {
        id: '1',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 4.3,
        adTitle: 'Título do Anúncio 1',
        adDate: '19 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização A',
        category: 'Livros',
        price: 'R$ 00,00',
      },
      {
        id: '2',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 4.5,
        adTitle: 'Título do Anúncio 2',
        adDate: '20 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização B',
        category: 'Eletrônicos',
        price: 'R$ 50,00',
      },
      {
        id: '3',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 4.0,
        adTitle: 'Título do Anúncio 3',
        adDate: '21 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização C',
        category: 'Móveis',
        price: 'R$ 100,00',
      },
      {
        id: '4',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 3.8,
        adTitle: 'Título do Anúncio 4',
        adDate: '22 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização D',
        category: 'Roupas',
        price: 'R$ 25,00',
      },
      {
        id: '5',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 4.2,
        adTitle: 'Título do Anúncio 5',
        adDate: '23 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização E',
        category: 'Brinquedos',
        price: 'R$ 15,00',
      },
      {
        id: '6',
        userName: 'Jão Pernalonga',
        userImage: 'https://via.placeholder.com/150',
        rating: 4.9,
        adTitle: 'Título do Anúncio 6',
        adDate: '24 de out. de 2024',
        adImage: 'https://via.placeholder.com/300',
        location: 'Localização F',
        category: 'Automóveis',
        price: 'R$ 500,00',
      },
    ];

    setAds(mockAds);
  }, []);

  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar />
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {ads.map((ad) => (
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
      </div>
    </div>
  );
};

export default Home;
