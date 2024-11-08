import React, { useEffect, useState } from 'react';
import SimpleFilterBar from '@/components/Organisms/SimpleFilterBar';
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
  isInNegotiation: boolean;
  isActive: boolean;
}

interface SimpleFilters {
  searchTerm: string;
  customFilter: string;
}

const MyAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('active');
  const adsPerPage = 6;

  // Mock de dados simulando uma chamada ao backend
  useEffect(() => {
    const mockAds: Ad[] = Array.from({ length: 20 }, (_, i) => ({
      id: (i + 1).toString(),
      userName: 'Jão Pernalonga',
      userImage: '',
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      adTitle: `Título do Anúncio ${i + 1}`,
      adDate: '20 de out. de 2024',
      adImage: '',
      location: `Localização ${String.fromCharCode(65 + (i % 5))}`,
      category: ['Livros', 'Eletrônicos', 'Móveis', 'Roupas', 'Brinquedos'][i % 5],
      price: `R$ ${(Math.random() * 100).toFixed(2)}`,
      isInNegotiation: i % 2 === 0,
      isActive: i % 3 !== 0,
    }));

    setAds(mockAds);
    setFilteredAds(mockAds);
  }, []);

  const handleApplyFilters = (filters: SimpleFilters) => {
    const filtered = ads.filter((ad) => {
      const matchesSearch = ad.adTitle.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCustomFilter =
        filters.customFilter === 'all'
          ? ad.isInNegotiation || ad.userName === 'Jão Pernalonga'
          : ad.userName === 'Jão Pernalonga';
      const matchesStatus = statusFilter === 'active' ? ad.isActive : !ad.isActive;

      return matchesSearch && matchesCustomFilter && matchesStatus;
    });

    setFilteredAds(filtered);
    setCurrentPage(1);
  };

  const handleStatusToggle = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    handleApplyFilters({ searchTerm: '', customFilter: 'all' });
  };

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`w-28 px-6 py-2 rounded-l-md ${
            statusFilter === 'active' ? 'bg-blue-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleStatusToggle('active')}
        >
          Ativos
        </button>
        <button
          className={`w-28 px-6 py-2 rounded-r-md ${
            statusFilter === 'inactive' ? 'bg-blue-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleStatusToggle('inactive')}
        >
          Passados
        </button>
      </div>

      <SimpleFilterBar onApplyFilters={handleApplyFilters} />

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {currentAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={setCurrentPage} />
    </div>
  );
};

export default MyAds;
