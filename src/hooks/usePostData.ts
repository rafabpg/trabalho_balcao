import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";
import { queryClient } from "@/services/queryClient";

type PostDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
  headers?: any;
};

const usePostData = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, data, url, headers }: PostDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "post",
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

export default usePostData;
