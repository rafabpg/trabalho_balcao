import React, {  useState } from "react";
import SimpleFilterBar from "@/components/Organisms/SimpleFilterBar";
import AdList from "@/components/Organisms/AdList";
import Pagination from "@/components/Molecules/Pagination";
import useGetData from "@/hooks/useGetMyAds";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/Atoms/LoadingSpinner";
import useDeleteAd from "@/hooks/useDeleteAd";

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: string;
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
  };
}

interface SimpleFilters {
  searchTerm: string;
  customFilter: string;
}

const MyAds: React.FC = () => {
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("active");
  const { auth,currentUser } = useAuth();

  const { data, isLoading, error, isError } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/advertisements",
    params: `my=${true}`,
    headers: localStorage.getItem("auth"),
    page: currentPage,
  });

  const { mutate: deleteData } = useDeleteAd();

  // const handleApplyFilters = (filters: SimpleFilters) => {
  //   const filtered = ads.filter((ad) => {
  //     const matchesSearch = ad.adTitle
  //       .toLowerCase()
  //       .includes(filters.searchTerm.toLowerCase());
  //     const matchesStatus =
  //       statusFilter === "active" ? ad.isActive : !ad.isActive;

  //     return matchesSearch && matchesStatus;
  //   });

  //   setFilteredAds(filtered);
  //   setCurrentPage(1);
  // };

  // const handleStatusToggle = (status: string) => {
  //   setStatusFilter(status);
  //   setCurrentPage(1);
  //   handleApplyFilters({ searchTerm: "", customFilter: "all" });
  // };

  const handleEdit = (id: string) => {
    console.log(`Editar anúncio ${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <p>Erro ao carregar anúncios: {(error as Error).message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`w-28 px-6 py-2 rounded-l-md ${
            statusFilter === "active"
              ? "bg-blue-950 text-white font-bold"
              : "bg-gray-300 text-gray-700"
          }`}
          // onClick={() => handleStatusToggle("active")}
        >
          Ativos
        </button>
        <button
          className={`w-28 px-6 py-2 rounded-r-md ${
            statusFilter === "inactive"
              ? "bg-blue-950 text-white font-bold"
              : "bg-gray-300 text-gray-700"
          }`}
          // onClick={() => handleStatusToggle("inactive")}
        >
          Passados
        </button>
      </div>

      {/* <SimpleFilterBar onApplyFilters={handleApplyFilters} /> */}

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
        {data.itens.map((ad) => (
          <AdList
            key={ad.id}
            id={ad.id}
            adTitle={ad.title}
            location={ad.campus}
            category={ad.category}
            price={ad.price}
            isCreatedByUser={currentUser?.id === ad.user.id}
            onDelete={() => {
              deleteData({
                httpClient: new AxiosHttpClientAdapter(),
                url: `/advertisements/${ad.id}`,
                headers: auth,
              });
            }}
            onEdit={() => handleEdit(ad.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={data.page}
        totalPages={data.page_count}
        paginate={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MyAds;
