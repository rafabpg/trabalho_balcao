import LoginForm from "@/components/Organisms/LoginForm";
import loginsidebanner from "@/assets/images/loginsidebanner.png";
import Banner from "@/assets/images/banneruff.jpg";

const LoginPage = () => {
  return (
    <section className="relative flex">
      <img
        src={loginsidebanner}
        alt="Login Banner"
      />
      <div className="flex flex-col items-center justify-center">
        <img src={Banner} />
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
