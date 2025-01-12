import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "../services/queryClient";

type DeleteDataProps = {
  httpClient: HttpClient;
  url: string;
  headers?:any
};

const useDeleteAd = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, url,headers }: DeleteDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "delete",
        headers:headers
      });
      return { data: response.body, status: response.statusCode };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAds'] });
    },
  });

  return {
    ...mutation,
  };
};

export default useDeleteAd;