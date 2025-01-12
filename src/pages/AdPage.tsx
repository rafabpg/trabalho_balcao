import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import ProposalModal from "@/components/Organisms/ProposalModal";
import Tag from "@/components/Molecules/Tag";
import Description from "@/components/Molecules/Description";
import Button from "@/components/Atoms/Button";
import Star from "@/assets/icons/Star.png";
import { Ad } from "./Home";
import LoadingSpinner from "@/components/Atoms/LoadingSpinner";
import { useNotification } from "@/hooks/useNotification";

const fetchAd = async (adId: string): Promise<Ad> => {
  const response = await api.get(`/advertisements/${adId}`);
  return response.data;
};

const fetchImages = async (imageUrls: string[]): Promise<string[]> => {
  return Promise.all(
    imageUrls.map(async (url) => {
      const response = await api.get(url, { responseType: 'blob' });
      return URL.createObjectURL(response.data);
    })
  );
};

const AdPage: React.FC = () => {
  const { adId } = useParams<{ adId: string }>();
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [images, setImages] = useState<string[] | null>(null);
  const {showError} = useNotification()
  
  const { data: ad, isLoading, isError } = useQuery<Ad>({
    queryKey: ["advertisement", adId],
    queryFn: () => fetchAd(adId!),
    enabled: !!adId,
  });

  useEffect(() => {
    if (ad && ad.images_urls) {
      fetchImages(ad.images_urls.slice(0, 3))
        .then(setImages)
        .catch((error) => showError("Erro ao carregar imagens:", error));
    }
  }, [ad]);

  if (isLoading) return <LoadingSpinner/>;
  if (isError || !ad) return <p>Erro ao carregar anúncio.</p>;

  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto mt-14">
        <div className="flex justify-center">
          <div className="grid grid-rows-2 grid-cols-1 h-screen">
            <div className="grid grid-cols-3 gap-2">
              {images ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    className="w-full border border-secondary rounded h-full object-cover"
                  />
                ))
              ) : <LoadingSpinner/>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Tag text={ad.campus} categoria={false} />
                    <Tag text={ad.category} categoria={true} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">{ad.title}</h1>
                    <Description text={ad.description} />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-4xl text-right font-bold mt-2">
                  {`R$${Number(ad.price).toFixed(2)}`}
                </div>
                <div className="text-right mt-3">
                  <Button onClick={() => setIsProposalModalOpen(true)} text="Iniciar" className="px-5" />
                </div>
                <div className="flex items-center border border-secondary rounded-md w-96 h-40 ml-auto mt-10">
                  <div className="bg-lighter-primary rounded-full w-28 h-28 mt-4 ml-4"></div>
                  <div className="flex flex-col justify-center ml-4">
                    <span className="text-3xl font-bold">{ad.user.full_name}</span>
                    <div className="flex items-center mt-2">
                      <img src={Star} alt="Estrela" className="mr-2" />
                      <span>
                        {ad.user.rating !== undefined
                          ? ad.user.rating.toFixed(2)
                          : "Não avaliado"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isProposalModalOpen && (
        <ProposalModal
          onClose={() => setIsProposalModalOpen(false)}
          adId={ad.id}
          sellerName={ad.user.full_name}
          productPrice={ad.price}
        />
      )}
    </div>
  );
};

export default AdPage;
