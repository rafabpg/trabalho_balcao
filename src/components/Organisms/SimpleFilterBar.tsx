import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

interface SimpleFilters {
  searchTerm: string;
  customFilter: string;
}

interface SimpleFilterBarProps {
  onApplyFilters: (filters: SimpleFilters) => void;
}

const SimpleFilterBar: React.FC<SimpleFilterBarProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<SimpleFilters>({
    searchTerm: '',
    customFilter: 'all',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: event.target.value });
  };

  const handleFilterChange = (value: string) => {
    setFilters({ ...filters, customFilter: value });
    onApplyFilters({ ...filters, customFilter: value });
  };

  const clearFilters = () => {
    const defaultFilters = {
      searchTerm: '',
      customFilter: 'all',
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-center gap-4">
        {/* <div className="relative">
          <button
            className="bg-blue-950 text-white px-4 py-2 rounded-full flex items-center justify-between gap-2 w-48"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {filters.customFilter === 'all' ? 'Todos os Anúncios' : 'Meus Anúncios'}
            <IoIosArrowDown size={18} />
          </button>
          {isDropdownOpen && (
            <ul className="absolute bg-blue-950 text-white rounded-xl mt-2 shadow-lg w-48 z-50">
              <li className="px-4 py-2 hover:bg-blue-800" onClick={() => handleFilterChange('all')}>
                Todos os Anúncios
              </li>
              <li className="px-4 py-2 hover:bg-blue-800" onClick={() => handleFilterChange('created')}>
                Meus Anúncios
              </li>
            </ul>
          )}
        </div> */}

        <div className="flex items-center bg-blue-950 rounded-full px-4 py-2 w-full md:max-w-lg">
          <FiSearch className="text-white mr-2" size={20} />
          <input
            type="text"
            value={filters.searchTerm}
            placeholder="Pesquise o título do anúncio"
            className="bg-transparent text-white w-full outline-none"
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
    </div>
  );
};

export default SimpleFilterBar;
