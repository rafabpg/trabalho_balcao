import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "../services/queryClient";

type UpdateDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
  headers?: any;
};
const usePutAd = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, data, url, headers }: UpdateDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "put",
        body: data,
        headers: headers,
      });
      return { data: response.body, status: response.statusCode };
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myAds"] });
        queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    },
  });

  return {
    ...mutation,
  };
};

export default usePutAd;
