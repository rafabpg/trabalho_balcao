import { useQuery } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { Ad } from "@/pages/MyAds";

type getDataProps = {
  httpClient: HttpClient;
  url: string;
  params?: any;
  headers?: any;
  page: number;
};

type ResponseAd = {
  itens: Ad[];
  page_count: number;
  page_size: number;
  page: number;
};

const useGetData = ({
  httpClient,
  url,
  params,
  headers,
  page,
}: getDataProps) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["myAds", url, params, page],
    queryFn: async () => {
      const parsedData = JSON.parse(headers);
      const { accessToken, client, uid } = parsedData;
      const response = await httpClient.request({
        url: `${url}?${params}&page=${page}`,
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

export default useGetData;
