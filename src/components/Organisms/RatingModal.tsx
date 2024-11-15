
import React, { useState } from 'react';
import X from "@/assets/icons/X.svg"
import Star from "@/assets/icons/Star 3.png";
import fadedStar from "@/assets/icons/Star 2.png";
import Input from '../Atoms/Input';
import Text from "@/assets/icons/textbubble.png";
import Button from '../Atoms/Button';




const RatingModal = () => {

        const[rating,setRating] = useState(1)
        const[opinion,setOpinion] = useState("")
        const [visivel,setVisivel] = useState(true)
        const visibilidade = visivel ? 'block' : "hidden"
        const toggleOff = () => {
            setVisivel(false)
        }
        

        const submit = () => {
            //substituir console.log por integração com backend
            console.log(rating);
            console.log(opinion);
        }

        return(
        
        <div id="container" className={visibilidade+ " h-screen"}>
        <div className = " p-4 max-w-5xl h-[650px] border-2 border-lighter-primary rounded-md">
            <button className = "float-right h-16 w-16" onClick = {toggleOff}> 
            <img className="w-16" src={X}/>
            </button>
                <div className="ml-22 mt-4 text-2xl font-seraf text-center justify-center">AVALIAÇÃO</div>
                <div className='text-2xl font-seraf mt-10'>O que você achou do anúncio?</div>
                <div className="text-2xl text-lighter-primary mt-2">Escolha 1 a 5 estrelas para classificar.</div>
                <div className = "mt-2 grid grid-cols-5 grid-rows-1 max-w-lg justify-items-center items-center">
                    <button onClick = {() =>{setRating(1)}} className="h-24 w-24"><img className = "object-cover" src={(rating >= 1) ? Star : fadedStar}></img></button>
                    <button onClick = {() =>{setRating(2)}} className="h-24 w-24"><img className = "object-cover" src={(rating >= 2) ? Star : fadedStar}></img></button>
                    <button onClick = {() =>{setRating(3)}} className="h-24 w-24"><img className = "object-cover" src={(rating >= 3) ? Star : fadedStar}></img></button>
                    <button onClick = {() =>{setRating(4)}} className="h-24 w-24"> <img className = "object-cover" src={(rating >= 4) ? Star : fadedStar}></img></button>
                    <button onClick = {() =>{setRating(5)}} className="h-24 w-24"><img className = "object-cover" src={(rating >= 5) ? Star : fadedStar}></img></button>
                </div>
                <div className="flex mt-4" >
                <img className="mt-2 h-6 w-6 mr-2" src={Text}/>
                <span className="text-2xl" >Deixe sua opinião</span>
                </div>
                <div className="float-right text-lighter-primary text-2xl">{opinion.length}/300</div>
                <textarea onChange={(ev)=>setOpinion(ev.target.value)}  maxLength= {300} className = "break-words text-2xl h-48 max-w-screen-lg  sm:md-full lg:w-full md:w-full placeholder-lighter-primary" placeholder='Conte sua experiência (opcional)'/>
                <Button className= "mt-8 float-right w-48 h-12" text="ENVIAR" onClick = {submit}/>





        </div></div>
    
    
    )

}; export default RatingModal;