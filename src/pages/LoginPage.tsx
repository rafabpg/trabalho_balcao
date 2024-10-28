import LoginForm from "@/components/Organisms/LoginForm";
import loginsidebanner from "@/assets/images/loginsidebanner.png";
import Banner from "@/assets/images/banneruff.jpg"

const LoginPage = () => {



return (

<div className = "container">
<div className="login-page-container">
<img src= {loginsidebanner}  className= "loginsidebanner"></img>
<div>
    <img className ="banner-image" src={Banner}></img>
    
    
    <LoginForm/>
    </div>
    
    
    
    
    
    </div></div>






);











};
export default LoginPage