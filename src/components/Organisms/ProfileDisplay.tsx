import UserImage from "../Atoms/UserImage";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import FormInput from "../Molecules/FormInput";
import user_default from "@/assets/images/user_default_profile.png";
import { useAuth } from "@/hooks/useAuth";

const ProfileDisplay = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          size={22}
          key={i}
          className={`text-lg ${
            i <= rating ? "text-lighter-secondary" : "text-lighter-primary"
          }`}
        />
      );
    }
    return stars;
  };

  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <section className="flex flex-col pl-4 md:pl-32 lg:pl-32 pt-10">
      <div className="flex gap-6 items-center flex-wrap">
        <UserImage
          src={currentUser?.image ? currentUser.image : user_default}
          className="w-16 h-16 md:24 md:h-24 lg:w-36 lg:h-36"
        />
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-semibold text-primary-darker">
            {currentUser?.full_name || "John Doe"}
          </h1>
          <div className="flex items-center gap-1 pb-4">
            {currentUser?.rating
              ? renderStars(currentUser.rating)
              : renderStars(0)}
            <span className="font-semibold text-xl text-primary-darker">
              {currentUser?.rating?.toFixed(1) || "0.0"}
            </span>
          </div>
          <Button
            text="Meu Histórico"
            className="bg-light text-primary-default border-primary-default text-base border-2 font-bold hover:bg-primary-default hover:text-light hover:transition-all ease-in-out"
            onClick={() => navigate("/meus-anuncios")}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-4">
        <FormInput
          type="text"
          label="Email"
          placeholder="Digite seu Email"
          value={currentUser?.email || ""}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-[rgba(19,81,133,0.75)] text-lighter-primary w-full sm:max-w-[250px]"
          disabled={true}
        />
        <FormInput
          type="text"
          label="CPF"
          placeholder="Digite seu CPF"
          value={currentUser?.cpf ? formatCpf(currentUser.cpf) : ""}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-[rgba(19,81,133,0.75)] text-lighter-primary w-full sm:max-w-[250px]"
          disabled={true}
        />
      </div>
    </section>
  );
};

export default ProfileDisplay;
