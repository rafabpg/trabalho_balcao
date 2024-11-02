import Loc from "@/assets/icons/local.png"
import TagIcon from "../Atoms/TagIcon"

interface TagProps{
    text: string
    categoria: boolean
}

const Tag = ({text,categoria}:TagProps) =>{
    return(

        <div className= "tag">
        <p className="tag-text"><TagIcon categoria = {categoria}/>{text}</p></div>
        

    )




} 

export default Tag