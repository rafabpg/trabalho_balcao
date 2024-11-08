import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

interface Filters {
  searchTerm: string;
  priceOrder: string;
  category: string;
  location: string;
  dateOrder: string;
}

interface SearchAndFilterBarProps {
  onApplyFilters: (filters: Filters) => void;
}

const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    priceOrder: '',
    category: '',
    location: '',
    dateOrder: '',
  });

  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);

  // Função para fechar todos os dropdowns
  const closeAllDropdowns = () => {
    setIsOpenPrice(false);
    setIsOpenCategory(false);
    setIsOpenLocation(false);
    setIsOpenDate(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: event.target.value });
  };

  const handlePriceFilter = (order: string) => {
    setFilters({ ...filters, priceOrder: order });
    closeAllDropdowns();
  };

  const handleCategoryFilter = (category: string) => {
    setFilters({ ...filters, category });
    closeAllDropdowns();
  };

  const handleLocationFilter = (location: string) => {
    setFilters({ ...filters, location });
    closeAllDropdowns();
  };

  const handleDateFilter = (order: string) => {
    setFilters({ ...filters, dateOrder: order });
    closeAllDropdowns();
  };

  const clearFilters = () => {
    const defaultFilters = {
      searchTerm: '',
      priceOrder: '',
      category: '',
      location: '',
      dateOrder: '',
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const priceText = filters.priceOrder ? `Preços: ${filters.priceOrder === 'asc' ? 'Menor - Maior' : 'Maior - Menor'}` : 'Filtre por preços';
  const categoryText = filters.category ? `Categoria: ${filters.category}` : 'Filtre por categorias';
  const locationText = filters.location ? `Localização: ${filters.location}` : 'Filtre por localização';
  const dateText = filters.dateOrder ? `Data: ${filters.dateOrder === 'recent' ? 'Mais recente' : 'Mais antigo'}` : 'Filtre por data';

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="flex items-center bg-blue-950 rounded-full px-4 py-2 w-full md:max-w-lg">
          <FiSearch className="text-white mr-2" size={20} />
          <input
            type="text"
            value={filters.searchTerm}
            placeholder="Pesquise o título do anúncio"
            className="bg-transparent text-white placeholder-white w-full outline-none"
            onChange={handleSearchChange}
          />
        </div>
        <button className="bg-blue-950 text-white px-4 py-2 rounded-xl" onClick={applyFilters}>
          Buscar
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl" onClick={clearFilters}>
          Limpar Filtros
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { text: priceText, isOpen: isOpenPrice, setIsOpen: setIsOpenPrice, handler: handlePriceFilter, options: ['asc', 'desc'], labels: ['Menor para Maior', 'Maior para Menor'] },
          { text: categoryText, isOpen: isOpenCategory, setIsOpen: setIsOpenCategory, handler: handleCategoryFilter, options: ['Livros', 'Eletrônicos', 'Móveis', 'Roupas', 'Brinquedos'], labels: ['Livros', 'Eletrônicos', 'Móveis', 'Roupas', 'Brinquedos'] },
          { text: locationText, isOpen: isOpenLocation, setIsOpen: setIsOpenLocation, handler: handleLocationFilter, options: ['A', 'B', 'C', 'D', 'E'], labels: ['Localização A', 'Localização B', 'Localização C', 'Localização D', 'Localização E'] },
          { text: dateText, isOpen: isOpenDate, setIsOpen: setIsOpenDate, handler: handleDateFilter, options: ['recent', 'oldest'], labels: ['Mais recente', 'Mais antigo'] },
        ].map((filter, index) => (
          <div key={index} className="relative">
            <button
              className="bg-blue-950 text-white px-4 py-2 rounded-full flex items-center justify-between gap-2 w-48 h-10"
              onClick={() => {
                closeAllDropdowns();
                filter.setIsOpen(!filter.isOpen);
              }}
            >
              <div className="w-1/2 text-sm whitespace-nowrap">{filter.text}</div>
              <IoIosArrowDown size={18} />
            </button>
            {filter.isOpen && (
              <ul className="absolute bg-blue-950 text-white rounded-xl mt-2 shadow-lg w-48 z-50">
                {filter.options.map((option, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-blue-800 cursor-pointer text-sm rounded-xl"
                    onClick={() => filter.handler(option)}
                  >
                    {filter.labels[i]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
