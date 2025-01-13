import LoadingSpinner from "@/components/Atoms/LoadingSpinner";
import FormAnnouncementUpdate from "@/components/Organisms/FormAnnouncementUpdate";
import { useAuth } from "@/hooks/useAuth";
import useGetAd from "@/hooks/useGetAd";
import { useNotification } from "@/hooks/useNotification";
import usePutAd from "@/hooks/usePutAd";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";
import { useNavigate, useParams } from "react-router-dom";

const AnnouncementEdit = () => {
  const { adId } = useParams<{ adId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useGetAd({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/advertisements",
    id: adId,
    headers: localStorage.getItem("auth"),
  });
  const {auth} = useAuth()
  const {mutateAsync} = usePutAd()
  const {showError, showSuccess} = useNotification()


  const handleSave = async (data: any) => {
    try {
      await mutateAsync({
      httpClient: new AxiosHttpClientAdapter(),
      data: data,
      url: `/advertisements/${adId}`,
      headers:auth
    })
      navigate(-1)
      showSuccess("Anuncio atualizado com sucesso!")
    } catch (error) {
      showError("Erro ao atualizar anúncio")
    }
  }
  
  const handleCancel = () => {
    navigate(-1)
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <p>Erro ao carregar anúncio: {(error as Error).message}</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-primary p-4">Atualizar Anúncio</h1>
      <FormAnnouncementUpdate handleCancel={handleCancel} announcementData={data} handleSave={handleSave} />
    </section>
  );
};

export default AnnouncementEdit;
