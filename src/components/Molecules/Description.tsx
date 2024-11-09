import { useState } from "react"


interface DescriptionProps{
    text:string
}




const Description = ({text}:DescriptionProps) =>{
    
    const [buttonText,setButtonText] = useState('Ver descrição completa')
    const [expanded,setExpanded] = useState(false)

    function expand(){
        
        
        if(expanded == false){
            setExpanded(true);
            setButtonText('Ver menos');
        }else{
            setExpanded(false);
            setButtonText('Ver descrição completa')
        }



    }
    
    
    return(
        < div className= "h-48">
            
            
            <div className ={"w-full " + (expanded ? 'h-56 overflow-scroll' : 'h-24 overflow-hidden' )}>
                <div className = "text-2xl font-sans break-words" >{text}</div> 
            </div>
            <button className="text-primary-default text-2xl font-sans font-bold" onClick={expand}> {buttonText} </button>
        </div>
       
        

    )




}

export default Description