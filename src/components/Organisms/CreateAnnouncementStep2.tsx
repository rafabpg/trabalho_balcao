import FormCard from "../Atoms/FormCard";
import ImageUploader from "../Atoms/ImageUploader";
import MultiImages from "../Molecules/MultiImages";
import MultiImageUpload from "../Molecules/MultiImages";
import FormInput from "../Molecules/FormInput";
import { useCreateAnnouncementContext } from "@/hooks/useCreateAnnouncementContext";

const CreateAnnouncementStep2 = () => {
  const { register, errors,setValue } = useCreateAnnouncementContext();

  return (
    <section className="flex flex-col items-center">
      <h1 className="pb-11 text-center text-secondary font-bold text-2xl lg:text-3xl">
        Crie seu próprio Anúncio
      </h1>
      <FormCard>
        <h2 className="text-xl md:text-2xllg:text-3xl text-light font-bold">
          Informações Adicionais para seu Anúncio
        </h2>
        <div className="flex flex-col gap-10">
          <div className="flex lg:gap-20 md:gap-10 gap-5 flex-col  md:flex-row lg:flex-row">
            <FormInput
              type="text"
               labelClassName="text-light text-xl font-bold"
              placeholder="(xx) 99999-9999"
              className="max-w-[282px] lg:w-[282px]"
              label="Digite o telefone para contato"
              {...register("phone_contact")}
              error={errors.phone?.message}
              mask={{
                mask: "(__) _____-____",
                replacement: {
                  _: /[0-9]/,
                },
              }}
              errorMessage={errors.phone?.message}
            />
            <FormInput
              type="text"
              placeholder="ex:teste@gmail.com"
               labelClassName="text-light text-xl font-bold"
              className="max-w-[282px] lg:w-[282px]"
              {...register("email_contact")}
              error={errors.email?.message}
              label="Digite o email para contato"
              errorMessage={errors.email?.message}
            />
          </div>
          <MultiImageUpload setValue={setValue}/>
        </div>
      </FormCard>
    </section>
  );
};

export default CreateAnnouncementStep2;
