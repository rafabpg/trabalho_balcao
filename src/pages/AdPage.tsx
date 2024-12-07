import { useState } from "react";
import { useParams } from "react-router-dom";
import ProposalModal from "@/components/Organisms/ProposalModal"; // Certifique-se de que o caminho está correto
import Tag from "@/components/Molecules/Tag";
import Description from "@/components/Molecules/Description";
import Button from "@/components/Atoms/Button";
import axios from "axios";
import Star from "@/assets/icons/Star.png";
import { useEffect } from "react";

interface ad{
    id: string
    title: string 
    description: string
    price: number
    status: null
    category: string | null
    campus: string | null
    phone_contact : ""
    email_contact: ""
    created_at : string
    updated_at: string
    user: {
      full_name: string
      rating: string | undefined
    }
    images_urls: string[]
}

const AdPage = () => {
const { adId } = useParams();
const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
const [ad,setAd] = useState<ad>();
const [img1, setImg1] = useState('');
const [img2, setImg2] = useState('');
const [img3, setImg3] = useState('');
const [ratingUndef, setRatingDef] = useState(false);


const url = "https://dynamic-herring-cosmic.ngrok-free.app/api/v1/advertisements/" +adId;

useEffect(() =>{
    var authData = {accessToken: "" , uid: "", client: "" };
      if (document.cookie != "") {
        const cookieData = document.cookie.match(/auth=([^;]*)/)![1];
        authData = JSON.parse(cookieData);
    }
      axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
            'access-token': authData.accessToken,
            'uid' : authData.uid,
            'client' : authData.client
          },
        })
          .then((response) => {
            if(response.data.user.rating == undefined){
                setRatingDef(true);
            }
            setAd(response.data);
            
            fetch(response.data.images_urls[0], {
              headers: {
                'Content-Type': 'image/png',
                'ngrok-skip-browser-warning': '69420',
                'access-token': authData.accessToken,
                'uid' : authData.uid,
                'client' : authData.client
              }, })
              .then((response) => response.blob())
              .then((blob) => {
                setImg1(URL.createObjectURL(blob));
  
              })
              .catch(error => {
                console.error(error);
              }); 
              
              fetch(response.data.images_urls[1], {
                headers: {
                  'Content-Type': 'image/png',
                  'ngrok-skip-browser-warning': '69420',
                  'access-token': authData.accessToken,
                  'uid' : authData.uid,
                  'client' : authData.client
                }, })
                .then((response) => response.blob())
                .then((blob) => {
                  setImg2(URL.createObjectURL(blob));
    
                })
                .catch(error => {
                  console.error(error);
                });

                fetch(response.data.images_urls[2], {
                    headers: {
                      'Content-Type': 'image/png',
                      'ngrok-skip-browser-warning': '69420',
                      'access-token': authData.accessToken,
                      'uid' : authData.uid,
                      'client' : authData.client
                    }, })
                    .then((response) => response.blob())
                    .then((blob) => {
                      setImg3(URL.createObjectURL(blob));
        
                    })
                    .catch(error => {
                      console.error(error);
                    });
                
          })
          .catch(error => {
            console.error(error);
          });   
  },[]);



  return (
    <div>
      <div className="p-4 max-w-7xl center ml-auto mr-auto mt-14">
        <div className="flex justify-center">
          <div className="grid grid-rows-2 grid-cols-1 h-screen">
            <div className="grid grid-cols-3 grid-rows-1 h-full gap-2">
              <img src={img1} className="block w-full border border-secondary h-full rounded" alt="img1" />
              <img src={""} className="block w-full border border-secondary rounded h-full object-cover" alt="img2" />
              <img src={""} className="block w-full border border-secondary h-full rounded object-cover" alt="img3" />
            </div>

            <div className="grid grid-cols-2 grid-rows-1">
              <div className="grid grid-rows-2 grid-cols-1 h-40">
                <span className="grid grid-rows-1 grid-cols-2 w-80 gap-4">
                  <Tag text={ad?.campus!} categoria={false} />
                  <Tag text={ad?.category!} categoria={true} />
                </span>
                <div className="grid grid-rows-2">
                  <div>
                    <div className="block text-4xl font-bold h-24 font-sans">{ad?.title}</div>
                    <Description text={ad?.description!} />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-4xl text-right font-bold mt-2">{`R$${parseFloat(ad?.price!.toString()!).toFixed(2).toString()}`}</div>
                <div className="text-right mt-3">
                  <Button onClick={() => setIsProposalModalOpen(true)} text="Iniciar" className="px-5" />
                </div>
                <div className="flex items-center text-center border border-secondary rounded-md w-96 h-40 ml-auto mt-10">
                  <div className="bg-lighter-primary rounded-full w-28 h-28 mt-4 ml-4"></div>
                  <span className="grid grid-rows-2 w-64">
                    <div className="text-3xl font-sans text-primary-darker text-left mt-8">{ad?.user.full_name}</div>
                    <div className="flex items-center text-center w-auto h-9">
                      <img src={Star} className="mr-2" alt="Star" />
                      <span className="text-primary-darker text-base">{ratingUndef? "Nenhuma" : parseFloat(ad?.user.rating!.toString()!).toFixed(2).toString()}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isProposalModalOpen && (
        <ProposalModal
          onClose={() => setIsProposalModalOpen(false)}
          sellerName={ad?.user.full_name || "Vendedor"}
          productPrice={ad?.price || 0}
        />
      )}
    </div>
  );
};

export default AdPage;