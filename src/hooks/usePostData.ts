import { useMutation } from "@tanstack/react-query";
import { HttpClient } from "../services/axiosAdapter";

type PostDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
};

const usePostData = () => {
  const mutation = useMutation({
    mutationFn: async ({ httpClient, data, url }: PostDataProps) => {
      const response = await httpClient.request({
        url: url,
        method: "post",
        body: data,
      });
      return { data: response.body, status: response.statusCode };
    },
  });

  return {
    ...mutation,
  };
};

export default usePostData;
