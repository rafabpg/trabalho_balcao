import FormCard from "@/components/Atoms/FormCard";
import Label from "@/components/Atoms/Label";
import SelectField from "@/components/Atoms/SelectField";
import FormInput from "@/components/Molecules/FormInput";
import { useCreateAnnouncementContext } from "@/hooks/useCreateAnnouncementContext";
import {
  CategoryEnum,
  ItemTypeEnum,
  LocalizationEnum,
} from "@/shared/enumsForm";
import PriceInput from "../Atoms/PriceInput";
import CurrencyInput from "react-currency-input-field";

const CreateAnnouncementStep1 = () => {
  const { register, errors } = useCreateAnnouncementContext();

  return (
    <section className="flex flex-col items-center">
      <h1 className="pb-11 text-center text-secondary font-bold text-2xl lg:text-3xl">
        Crie seu próprio Anúncio
      </h1>
      <FormCard>
        <FormInput
          type="text"
          placeholder="Nome do Anúncio"
          {...register("title")}
          error={errors.title?.message}
          label="Adicione seu Título"
           labelClassName="text-light text-xl font-bold"
          errorMessage={errors.title?.message}
        />
        <div className="flex flex-col gap-3">
          <Label children="Adicione a descrição do seu anúncio"  className="text-light text-xl font-bold"/>
          <textarea
            className="min-h-[100px] h-[152px]  max-h-[400px] max-w-[678px] sm:w-[500px] md:w-[600px] lg:w-[678px] rounded-md py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary placeholder-lighter-secondary"
            placeholder="Adicione  descrição do seu anúncio"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <FormInput
          type="number"
          placeholder="123,00"
          {...register("price")}
           labelClassName="text-light text-xl font-bold"
          error={errors.price?.message}
          label="Adicione seu Preço"
          errorMessage={errors.price?.message}
        />
        <SelectField
          {...register("category")}
          options={Object.values(CategoryEnum).map((value) => ({
            label: value,
            value,
          }))}
           labelClassName="text-light text-xl font-bold"
          placeholder="Selecione uma categoria"
          label="Quais dessas categorias seu anúncio se encaixa?"
          className="self-start max-w-[368px] lg:w-[368px]"
          errorMessage={errors.category?.message}
        />
        <SelectField
          {...register("item_type")}
          options={Object.values(ItemTypeEnum).map((value) => ({
            label: value,
            value,
          }))}
           labelClassName="text-light text-xl font-bold"
          placeholder="Selecione um tipo de item"
          label="Por que você esta criando esse anúncio?"
          className="self-start max-w-[368px]  lg:w-[368px]"
          errorMessage={errors.item_type?.message}
        />
        <SelectField
          {...register("campus")}
          options={Object.values(LocalizationEnum).map((value) => ({
            label: value,
            value,
          }))}
           labelClassName="text-light text-xl font-bold"
          placeholder="Selecione uma localização"
          label="Localização do anúncio"
          className="self-start max-w-[368px]  lg:w-[368px]"
          errorMessage={errors.localization?.message}
        />
      </FormCard>
    </section>
  );
};

export default CreateAnnouncementStep1;
