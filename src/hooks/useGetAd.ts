import { HttpClient } from "@/services/axiosAdapter";
import { useQuery } from "@tanstack/react-query";

type getDataProps = {
  httpClient: HttpClient;
  url: string;
  id?: any;
  headers?: any;
};

const useGetAd = ({ httpClient, url, id, headers }: getDataProps) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["adById", url, id],
    queryFn: async () => {
      const parsedData = JSON.parse(headers);
      const { accessToken, client, uid } = parsedData;
      const response = await httpClient.request({
        url: `${url}/${id}`,
        method: "get",
        headers: {
          "access-token": accessToken,
          client: client,
          uid: uid,
        },
      });
      return response.body;
    },
    staleTime: 5000,
  });
  return { data, isLoading, error, isError };
};

export default useGetAd;
