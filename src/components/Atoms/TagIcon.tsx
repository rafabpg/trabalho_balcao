import Loc from "@/assets/icons/local.png"
import Cat from "@/assets/icons/categoria.png"
import { useState } from "react"

interface TagIconProps{
    categoria : boolean
}





const TagIcon = ({categoria}:TagIconProps) =>{
    
    const img = categoria ? Cat : Loc 
    
    return <img src= {img} className="mr-1 ml-1"></img>





}
export default TagIcon