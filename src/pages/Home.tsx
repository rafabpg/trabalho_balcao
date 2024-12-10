import React, { useEffect, useState } from 'react';
import WelcomeBanner from '@/components/Organisms/WelcomeBanner';
import SearchAndFilterBar from '@/components/Organisms/SearchAndFilterBar';
import AdCard from '@/components/Organisms/AdCard';
import Pagination from '@/components/Molecules/Pagination';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

export interface Ad {
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
  images_urls: string[];
  user: {
    id: string;
    full_name: string;
    rating: number;
  }
}

interface Filters {
  searchTerm: string;
  priceOrder: string;
  category: string;
  location: string;
  dateOrder: string;
}

const fetchAds = async (page: number, filters: Filters): Promise<{ itens: Ad[]; page_size: number; total_count: number; page: number }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    category: filters.category,
    campus: filters.location,
  }).toString();

  const response = await api.get(`/advertisements?${params}`);
  if (response.status !== 200) throw new Error('Failed to fetch ads');
  return response.data;
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
  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['advertisements'],
    queryFn: () => fetchAds(currentPage, filters),
  });
  const ads = data?.itens || [];
  const totalPages = 100
  
  useEffect(() => {
    refetch();
  }, [filters, currentPage, refetch]);

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <p>Erro ao carregar anúncios: {(error as Error).message}</p>;

  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar onApplyFilters={setFilters} />
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {ads.map((ad: Ad) => <AdCard ad={ad}/> )}
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
