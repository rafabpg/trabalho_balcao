import { useState } from "react"


interface DescriptionProps{
    text:string
}




const Description = ({text}:DescriptionProps) =>{
    
    const [buttonText,setButtonText] = useState('Ver descrição completa')

    function expand(){
        
        const container = document.getElementById('description-container') as HTMLElement;
        if(container?.style.height != '280px'){
            container?.style.setProperty('height','280px');
            setButtonText('Ver menos');
        }else{
            container?.style.setProperty('height','140px');
            setButtonText('Ver descrição completa')
        }



    }
    
    
    return(
        < div>
            
            
            <div id ="description-container">
                <div className = "description-text" >{text}</div> 
            </div>
            <button className="description-expand" onClick={expand}> {buttonText} </button>
        </div>
       
        

    )




}

export default Description