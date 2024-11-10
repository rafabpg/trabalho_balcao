import LoginForm from "@/components/Organisms/LoginForm";
import loginsidebanner from "@/assets/images/loginsidebanner.png";
import Banner from "@/assets/images/banneruff.jpg"

const LoginPage = () => {

  return (
    <div className="px-96 flex mt-20">
        <img src={loginsidebanner} className=" h-auto w-full"></img>
        <span>
          <img src={Banner}></img>
          <LoginForm />
        </span>
      </div>
  );
};
export default LoginPage