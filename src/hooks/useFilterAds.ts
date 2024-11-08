import { useState, useEffect } from 'react';

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

interface Filters {
  searchTerm: string;
  priceOrder: string;
  category: string;
  location: string;
  dateOrder: string;
}

const useFilterAds = (ads: Ad[], filters: Filters) => {
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);

  useEffect(() => {
    let filtered = [...ads];

    if (filters.searchTerm) {
      filtered = filtered.filter((ad) =>
        ad.adTitle.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((ad) => ad.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter((ad) => ad.location.includes(filters.location));
    }

    if (filters.priceOrder) {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('R$', '').trim());
        const priceB = parseFloat(b.price.replace('R$', '').trim());
        return filters.priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    if (filters.dateOrder) {
      filtered.sort((a, b) =>
        filters.dateOrder === 'recent' ? b.adDate.localeCompare(a.adDate) : a.adDate.localeCompare(b.adDate)
      );
    }

    setFilteredAds(filtered);
  }, [ads, filters]);

  return filteredAds;
};

export default useFilterAds;
