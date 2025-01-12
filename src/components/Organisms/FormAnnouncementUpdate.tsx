import React from "react";
import FormCard from "../Atoms/FormCard";
import Button from "../Atoms/Button";
import { Ad } from "@/shared/announcement";
import FormInput from "../Molecules/FormInput";
import SelectField from "../Atoms/SelectField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  campusMap,
  categoryMap,
  updateAnnouncementSchema,
  UpdateAnnouncementSchema,
} from "@/schemas/updateAnnouncementSchema";
import Label from "../Atoms/Label";
import { CategoryEnum, LocalizationEnum } from "@/shared/enumsForm";

interface FormAnnouncementUpdateProps {
  announcementData: Ad;
  handleSave: (data: any) => void;
  handleCancel: () => void;
}

const FormAnnouncementUpdate = ({
  announcementData,
  handleSave,
  handleCancel,
}: FormAnnouncementUpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAnnouncementSchema>({
    resolver: zodResolver(updateAnnouncementSchema),
    defaultValues: {
      title: announcementData.title,
      description: announcementData.description,
      price: announcementData.price,
      email_contact: announcementData.email_contact,
      phone_contact: announcementData.phone_contact,
    },
  });
  const [category, setCategory] = React.useState<string>(
    CategoryEnum[
      announcementData.category.toUpperCase() as keyof typeof CategoryEnum
    ]
  );
  const [campus, setCampus] = React.useState<string>(
    LocalizationEnum[
      announcementData.campus.toUpperCase() as keyof typeof LocalizationEnum
    ]
  );

  const onSubmit = (data: UpdateAnnouncementSchema) => {
    handleSave({
      ...data,
      category: categoryMap[category as keyof typeof categoryMap],
      campus: campusMap[campus as keyof typeof campusMap],
    });
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)} className="m-4">
      <FormInput
        type="text"
        label="Nome"
        {...register("title")}
        errorMessage={errors.title?.message}
        labelClassName="text-light text-xl font-bold"
        className="bg-light  text-primary-default w-full sm:max-w-[250px]"
      />
      <div className="flex flex-col gap-3">
        <Label children="Descrição" className="text-light" />
        <textarea
          {...register("description")}
          className="min-h-[100px] h-[152px] max-h-[400px] max-w-[678px] sm:w-[500px] md:w-[600px] lg:w-[678px] rounded-md py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary text-primary-default"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <SelectField
        options={Object.values(CategoryEnum).map((value) => ({
          label: value,
          value,
        }))}
        labelClassName="text-light text-xl font-bold"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        placeholder="Altere a categoria"
        label="Categoria"
        className="self-start max-w-[368px] lg:w-[368px]"
      />
      <SelectField
        options={Object.values(LocalizationEnum).map((value) => ({
          label: value,
          value,
        }))}
        labelClassName="text-light text-xl font-bold"
        value={campus}
        onChange={(e) => {

          setCampus(e.target.value);
        }}
        placeholder="Altere o Campus"
        label="Campus"
        className="self-start max-w-[368px] lg:w-[368px]"
      />
      <FormInput
        type="number"
        label="Preço"
        {...register("price", { valueAsNumber: true })}
        errorMessage={errors.price?.message}
        labelClassName="text-light text-xl font-bold"
        className="bg-light text-primary-default w-full sm:max-w-[250px]"
      />
      <FormInput
        type="text"
        label="Telefone"
        {...register("phone_contact")}
        errorMessage={errors.phone_contact?.message}
        labelClassName="text-light text-xl font-bold"
        className="bg-light text-primary-default w-full sm:max-w-[250px]"
      />
      <FormInput
        type="text"
        label="E-mail"
        {...register("email_contact")}
        errorMessage={errors.email_contact?.message}
        labelClassName="text-light text-xl font-bold"
        className="bg-light text-primary-default w-full sm:max-w-[250px]"
      />
      <Button
        type="submit"
        text={"Atualizar anúncio"}
        className="px-6 bg-primary-darker"
      />
      <Button
        onClick={handleCancel}
        text={"Cancelar"}
        className="px-6 bg-red-color"
      />
    </FormCard>
  );
};

export default FormAnnouncementUpdate;
