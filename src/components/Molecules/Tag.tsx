import Loc from "@/assets/icons/local.png"
import TagIcon from "../Atoms/TagIcon"

interface TagProps{
    text: string | null
    categoria: boolean
}

const Tag = ({text,categoria}:TagProps) =>{
    return(

        <div className= "flex items-center text-center w-auto h-9 rounded-full mt-2  bg-lighter-primary">
        <TagIcon categoria = {categoria}/>
        <span className="text-lg text-secondary text-center text-nowrap">{text}</span></div>
        

    )




} 

export default Tag