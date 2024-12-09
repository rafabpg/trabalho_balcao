import React, { useState } from 'react';
import WelcomeBanner from '@/components/Organisms/WelcomeBanner';
import SearchAndFilterBar from '@/components/Organisms/SearchAndFilterBar';
import AdCard from '@/components/Organisms/AdCard';
import Pagination from '@/components/Molecules/Pagination';
import { useQuery } from '@tanstack/react-query';

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  kind: string;
  category: string;
  campus: string;
  phone_contact: string;
  email_contact: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface Filters {
  searchTerm: string;
  priceOrder: string;
  category: string;
  location: string;
  dateOrder: string;
}

const fetchAds = async (page: number): Promise<{ ads: Ad[]; total: number }> => {
  const response = await fetch(`/api/ads?page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch ads');
  return response.json();
};

const Home: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    priceOrder: '',
    category: '',
    location: '',
    dateOrder: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['advertisements'],
      queryFn: () => fetchAds(currentPage),
    }
  );

  const ads = data?.ads || [];
  const totalPages = Math.ceil((data?.total || 0) / adsPerPage);

  if (isLoading) return <p>Carregando anúncios...</p>;
  if (isError) return <p>Erro ao carregar anúncios: {(error as Error).message}</p>;

  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar onApplyFilters={setFilters} />
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {ads.map((ad: Ad) => (
              <AdCard
                key={ad.id}
                userName={ad.user_id}
                userImage={''}
                rating={5}
                adTitle={ad.title}
                adDate={ad.created_at}
                adImage={''}
                location={ad.campus}
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
