import { HttpClient } from "@/services/axiosAdapter";
import { Ad } from "@/shared/announcement";
import { useQuery } from "@tanstack/react-query";



type getDataProps = {
  httpClient: HttpClient;
  url: string;
  headers?: any;
  page: number;
  min_price?: number;
  campus?: string;
  min_date?: string;
  category?: string;
};

type ResponseAd = {
  itens: Ad[];
  page_count: number;
  page_size: number;
  page: number;
};

//&min_price=${min_price}&campus=${campus}&min_date=${min_date}&category=${category}
//max_price
//max_date

const useGetAllAds = ({
  httpClient,
  url,
  page,
  min_price,
  campus,
  min_date,
  category,
  headers,
}: getDataProps) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [
      "advertisements",
      url,
      page,
      min_price,
      campus,
      min_date,
      category,
    ],
    queryFn: async () => {
      const parsedData = JSON.parse(headers);
      const { accessToken, client, uid } = parsedData;
      const response = await httpClient.request({
        url: `${url}?page=${page}&campus=${campus}&category=${category}`,
        method: "get",
        headers: {
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      return response.body as ResponseAd;
    },
    staleTime: 5000,
  });
  return { data, isLoading, error, isError };
};

export default useGetAllAds;
