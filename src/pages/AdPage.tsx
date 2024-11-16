import Header from "@/components/Organisms/Header";
import React, { useState } from "react"
import { useParams } from "react-router-dom";
import img001_1 from "@/assets/images/001/img001-1.png";
import img001_2 from "@/assets/images/001/img001-2.png";
import img001_3 from "@/assets/images/001/img001-3.png";
import img015_1 from "@/assets/images/015/img015-1.png";
import img015_2 from "@/assets/images/015/img015-2.png";
import img015_3 from "@/assets/images/015/img015-3.png";
import img024_1 from "@/assets/images/024/img024-1.png";
import img024_2 from "@/assets/images/024/img024-2.png";
import img024_3 from "@/assets/images/024/img024-3.png";
import img036_1 from "@/assets/images/036/img036-1.png";
import img036_2 from "@/assets/images/036/img036-2.png";
import img036_3 from "@/assets/images/036/img036-3.png";
import Tag from "@/components/Molecules/Tag";
import Description from "@/components/Molecules/Description";
import Button from "@/components/Atoms/Button";
import Star from "@/assets/icons/Star.png"
import RatingModal from "@/components/Organisms/RatingModal";


interface ad{
    adId: string
    img1: string
    img2: string
    img3: string
    price: number
    categoria: string
    campus: string
    title: string 
    description: string
    user: string
    userrep: number
}

const loremipsum = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
const AdPage = () => {
const {adId} = useParams();
const ad1 = {adId: '001',img1: img001_1,img2:img001_2,
img3: img001_3, price: 50.00, categoria: "livros", campus:'Praia Vermelha',
title:"Netter Atlas de Anatomia Humana -  Frank H. Netter", 
description:loremipsum,
user: "Matheus Medicina", userrep: 4.65 } as ad;

const ad2 = {adId: '015',img1: img015_1,img2:img015_2,
img3: img015_3, price: 250.00, categoria: "móveis", campus:'Valonguinho',
title:"Armário de Duas Portas", description:loremipsum,
user: "Arnaldo Armário", userrep: 2.89 } as ad;

const ad3 = {adId: '024',img1: img024_1,img2:img024_2,
img3: img024_3, price: 50.00, categoria: "curso", campus:'Praia Vermelha',
title:"Curso de Cálculo", description:loremipsum,
user: "Caio Cálculoso", userrep: 4.90 } as ad;

const ad4 = {adId: '036',img1: img036_1,img2:img036_2,
img3: img036_3, price: 150.00, categoria: "objetos", campus:'Gragoatá',title: "Tablet usado",
description:loremipsum,user:"Tatiana Tablet", userrep: 3.00 } as ad;


const findCurrent = (adId?: string) => {
    if(ad1.adId == adId){
        return ad1
    }
    if(ad2.adId == adId){
        return ad2
    }
    if(ad3.adId == adId){
        return ad3
    }
    if(ad4.adId == adId){
        return ad4
    }}

const currentAd = findCurrent(adId)
return(
<div>
    <div className="p-4 max-w-7xl center ml-auto mr-auto mt-14">
    
    <RatingModal/>
        <div className="flex justify-center">
            <div className = "grid grid-rows-2 grid-cols-1 h-screen" >
            <div className = "grid grid-cols-3 grid-rows-1 h-full gap-2">
                <img src = {currentAd?.img1} className = "block  w-full border border-secondary h-full rounded" ></img>
                <img src = {currentAd?.img2} className = "block  w-full border border-secondary rounded h-full object-cover" ></img>
                <img src = {currentAd?.img3} className = "block  w-full border border-secondary h-full rounded object-cover" ></img>
            </div>
            
                <div className = "grid grid-cols-2 grid-rows-1">
                <div className= "grid grid-rows-2 grid-cols-1 h-40">
                    <span className="grid grid-rows-1 grid-cols-2 w-80 gap-4 ">
                    <Tag text={currentAd?.campus!} categoria={false} />
                    <Tag text={currentAd?.categoria!} categoria={true} />
                    </span>
                    
                    <div className="grid grid-rows-2 ">
                        <div>
                            <div className="block text-4xl font-bold h-24 font-sans">{currentAd?.title}</div>
                            <Description text={currentAd?.description!}/>
                        </div>
                        
                    
                    </div>
                
                </div>



                        <div>   
                            <div className= "text-4xl text-right font-bold mt-2">{`R$${parseFloat(currentAd?.price!.toString()!).toFixed(2).toString()}`}</div>
                            <div className="text-right mt-3"><Button text="Iniciar" className="px-5" /></div>
                            <div className = "flex items-center text-center border border-secondary rounded-md w-96 h-40 ml-auto mt-10">
                            <div className = "bg-lighter-primary rounded-full w-28 h-28 mt-4 ml-4 " ></div>
                            <span className="grid grid-rows-2 w-64">
                                <div className ="text-3xl font-sans text-primary-darker text-left mt-8">{currentAd?.user}</div>
                                <div className="flex items-center text-center w-auto h-9">
                                <img src={Star} className="mr-2"></img>
                                <span className = "text-primary-darker text-base">{parseFloat(currentAd?.userrep!.toString()!).toFixed(2).toString()}</span></div>
                            </span>
                            </div>

                        </div>

                </div>

        
            </div>
         </div>

    </div>      
</div>



);










};
export default AdPage