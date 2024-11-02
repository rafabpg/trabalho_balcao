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
import Button from "@/components/Button";
import Star from "@/assets/icons/Star.png"


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


const AdPage = () => {
const {adId} = useParams();
const ad1 = {adId: '001',img1: img001_1,img2:img001_2,
img3: img001_3, price: 50.00, categoria: "livros", campus:'Praia Vermelha',
title:"Netter Atlas de Anatomia Humana -  Frank H. Netter", 
description:"Livro de Anatomia seminovo conservado sem marcação de texto, Sétima Edição. Páginas em bom estado, capa plastificada.",
user: "Matheus Medicina", userrep: 4.65 } as ad;

const ad2 = {adId: '015',img1: img015_1,img2:img015_2,
img3: img015_3, price: 250.00, categoria: "móveis", campus:'Valonguinho',
title:"Armário de Duas Portas", description:"Armário de Madeira com verniz usado de duas portas, quatro gavetas embaixo...",
user: "Arnaldo Armário", userrep: 2.89 } as ad;

const ad3 = {adId: '024',img1: img024_1,img2:img024_2,
img3: img024_3, price: 50.00, categoria: "curso", campus:'Praia Vermelha',
title:"Curso de Cálculo", description:"Valores a partir de 50/h para cursos de Cálculo I, para valores de outros cálculos, entrar em contato.",
user: "Caio Cálculoso", userrep: 4.90 } as ad;

const ad4 = {adId: '036',img1: img036_1,img2:img036_2,
img3: img036_3, price: 150.00, categoria: "objetos", campus:'Gragoatá',title: "Tablet usado",
description:"Tablet usado conservado e funcional, vem com carregador.",user:"Tatiana Tablet", userrep: 3.00 } as ad;


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
<div><Header/>
    <div className="container">
    

        <div className="ad-page-container">
            <div className = "image-container">
                <img src = {currentAd?.img1} className = "adImage" ></img>
                <img src = {currentAd?.img2} className = "adImage" ></img>
                <img src = {currentAd?.img3} className = "adImage" ></img>
            </div>
            
            <div className= "ad-header-container">
                <div className="tag-container">
                <Tag text={currentAd?.campus!} categoria={false} />
                <Tag text={currentAd?.categoria!} categoria={true} />
                </div>
                
                <div className="ad-info-container">
                    <div>
                        <div className="ad-title">{currentAd?.title}</div>
                        <Description text={currentAd?.description!}/>
                    </div>
                    <div>   
                        <div className= "ad-price">{`R$${parseFloat(currentAd?.price!.toString()!).toFixed(2).toString()}`}</div>
                        <div className="start-ad"><Button text="Iniciar" /></div>
                        <div className = "announcer-window">
                        <div className = "user-image-placeholder" ></div>
                        <div className="user-header">
                            <div className ="user-ad-name">{currentAd?.user}</div>
                            <img src={Star} className="rep-user-ad-star"></img>
                            <div className = "user-rep-bar">{parseFloat(currentAd?.userrep!.toString()!).toFixed(2).toString()}</div>
                        </div>
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