import React, { useEffect, useState } from "react";
import WelcomeBanner from "@/components/Organisms/WelcomeBanner";
import SearchAndFilterBar from "@/components/Organisms/SearchAndFilterBar";
import AdCard from "@/components/Organisms/AdCard";
import Pagination from "@/components/Molecules/Pagination";
import LoadingSpinner from "@/components/Atoms/LoadingSpinner";
import { Ad } from "@/shared/announcement";
import useGetAllAds from "@/hooks/useGetAllAds";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";

interface Filters {
  searchTerm: string;
  priceOrder: string;
  category: string;
  location: string;
  dateOrder: string;
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    priceOrder: "",
    category: "",
    location: "",
    dateOrder: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isError } = useGetAllAds({
    httpClient: new AxiosHttpClientAdapter(),
    url: `/advertisements`,
    headers: localStorage.getItem("auth"),
    page: currentPage,
    campus: filters.location,
    category: filters.category,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <p>Erro ao carregar anúncios: {(error as Error).message}</p>;

  return (
    <div>
      <WelcomeBanner />
      <SearchAndFilterBar onApplyFilters={setFilters} />
      <div className="p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {data.itens.map((ad: Ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={data.page}
          totalPages={data.page_count}
          paginate={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
