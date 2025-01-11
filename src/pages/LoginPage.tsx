import LoginForm from "@/components/Organisms/LoginForm";
import loginsidebanner from "@/assets/images/loginsidebanner.png";
import Banner from "@/assets/images/banneruff.jpg";

const LoginPage = () => {
  return (
    <section className="flex flex-wrap min-h-screen overflow-hidden">
      <img
        src={loginsidebanner}
        alt="Login Banner"
        className="hidden md:block md:w-1/2 lg:w-2/5 h-auto object-cover"
      />
      <div className="flex flex-col justify-center px-6 items-center w-full md:w-1/2 lg:w-3/5">
        <img src={Banner} className="lg:w-2/3 h-auto" />
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
