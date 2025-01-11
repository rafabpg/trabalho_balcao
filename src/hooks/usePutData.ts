import { HttpClient } from '@/services/axiosAdapter';
import { useMutation } from '@tanstack/react-query';

type PutDataProps<T = unknown> = {
  httpClient: HttpClient;
  data: T;
  url: string;
  headers?:any
};

const usePutData = () => {
    const mutation = useMutation({
        mutationFn: async ({ httpClient, data, url,headers }: PutDataProps) => {
          const response = await httpClient.request({
            url: url,
            method: "patch",
            body: data,
            headers: headers
          });
          return { data: response.body, status: response.statusCode };
        },
      });
    
      return {
        ...mutation,
      };
}

export default usePutData