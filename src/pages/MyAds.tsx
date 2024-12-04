import React, { useEffect, useState } from 'react';
import SimpleFilterBar from '@/components/Organisms/SimpleFilterBar';
import AdList from '@/components/Organisms/AdList';
import Pagination from '@/components/Molecules/Pagination';

interface Ad {
  id: string;
  adTitle: string;
  location: string;
  category: string;
  price: string;
  isInNegotiation: boolean;
  isActive: boolean;
  isCreatedByUser: boolean;
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

  useEffect(() => {
    const mockAds: Ad[] = Array.from({ length: 20 }, (_, i) => ({
      id: (i + 1).toString(),
      adTitle: `Título do Anúncio ${i + 1}`,
      location: `Localização ${String.fromCharCode(65 + (i % 5))}`,
      category: ['Livros', 'Eletrônicos', 'Móveis', 'Roupas', 'Brinquedos'][i % 5],
      price: `R$ ${(Math.random() * 100).toFixed(2)}`,
      isInNegotiation: i % 2 === 0,
      isActive: i % 3 !== 0,
      isCreatedByUser: i % 4 === 0,
    }));

    setAds(mockAds);
    setFilteredAds(mockAds);
  }, []);

  const handleApplyFilters = (filters: SimpleFilters) => {
    const filtered = ads.filter((ad) => {
      const matchesSearch = ad.adTitle.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'active' ? ad.isActive : !ad.isActive;

      return matchesSearch && matchesStatus;
    });

    setFilteredAds(filtered);
    setCurrentPage(1);
  };

  const handleStatusToggle = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    handleApplyFilters({ searchTerm: '', customFilter: 'all' });
  };

  const handleDelete = (id: string) => {
    console.log(`Excluir anúncio ${id}`);
    setFilteredAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log(`Editar anúncio ${id}`);
  };

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`w-28 px-6 py-2 rounded-l-md ${statusFilter === 'active' ? 'bg-blue-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
            }`}
          onClick={() => handleStatusToggle('active')}
        >
          Ativos
        </button>
        <button
          className={`w-28 px-6 py-2 rounded-r-md ${statusFilter === 'inactive' ? 'bg-blue-950 text-white font-bold' : 'bg-gray-300 text-gray-700'
            }`}
          onClick={() => handleStatusToggle('inactive')}
        >
          Passados
        </button>
      </div>

      <SimpleFilterBar onApplyFilters={handleApplyFilters} />

      <div className="max-w-4xl mx-auto text-gray-700 font-semibold p-2 rounded-t-lg">
        <div className="w-10/12 grid grid-cols-4 items-center gap-4 justify-between">
          <span className="text-left flex-shrink-0">Nome</span>
          <span className="text-left flex-shrink-0">Localização</span>
          <span className="text-left flex-shrink-0">Categoria</span>
          <span className="text-left flex-shrink-0">Valor</span>
        </div>
        <hr className="border-gray-400 mt-2" />
      </div>

      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {currentAds.map((ad) => (
          <AdList
            key={ad.id}
            adTitle={ad.adTitle}
            location={ad.location}
            category={ad.category}
            price={ad.price}
            isCreatedByUser={ad.isCreatedByUser}
            onDelete={() => handleDelete(ad.id)}
            onEdit={() => handleEdit(ad.id)}
          />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={setCurrentPage} />
    </div>
  );
};

export default MyAds;
