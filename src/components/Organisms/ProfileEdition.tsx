import React, { useState } from "react";
import FormInput from "../Molecules/FormInput";
import Button from "../Atoms/Button";
import UserImage from "../Atoms/UserImage";
import user_default from "@/assets/images/user_default_profile.png"

const mockUser = {
  name: "John Doe",
  image: "",
  email: "F8b5T@example.com",
  cpf: "123.456.789-00",
  data_nascimento: "01/01/2000",
  rating: 4.9,
};

const ProfileEdition = () => {
  const [name, setName] = useState<string>(mockUser.name || "");
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameChanged(true);
  };

  const handleImageChange = (e:  any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsImageChanged(true);
    }
  };

  const handleSave = () => {
    setIsNameChanged(false);
  };

  const handleCancel = () => {
    setName(mockUser.name);
    setIsNameChanged(false);
  };

  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <section className="flex flex-col pl-4 md:pl-32 lg:pl-32 pt-10">
      <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-24">
        <UserImage
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : mockUser.image || user_default
          }
        />
        <div className="flex flex-col gap-3">
          <span className="text-base md:text-xl text-primary-default">
            Escolha uma outra imagem caso queira trocar a atual
          </span>
          <div className="flex items-center rounded bg-[rgba(0,79,159,0.5)]">
            <label className="flex items-center  text-white p-3 rounded cursor-pointer">
              <span className="text-sm md:text-base border border-light text-light font-bold px-4 py-2 rounded ">
                Arquivo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {selectedImage ? (
              <span className="text-light text-sm md:text-base font-bold">
                {selectedImage.name}
              </span>
            ) : (
              <span className="text-light text-sm md:text-base font-bold">
                Nenhum Arquivo Escolhido
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="py-8">
        <FormInput
          type="text"
          label="Nome"
          placeholder="Digite seu Nome"
          value={name}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-primary-default  text-lighter-primary w-full sm:max-w-[250px]"
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-wrap gap-6 pt-4">
        <FormInput
          type="text"
          label="Email"
          placeholder="Digite seu Email"
          value={mockUser.email}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-[rgba(19,81,133,0.75)]  text-lighter-primary w-full sm:max-w-[250px]"
          disabled={true}
        />
        <FormInput
          type="text"
          label="CPF"
          placeholder="Digite seu CPF"
          value={mockUser.cpf}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-[rgba(19,81,133,0.75)]   text-lighter-primary w-full sm:max-w-[250px]"
          onChange={() => formatCpf(mockUser.cpf)}
          disabled={true}
        />
        <FormInput
          type="text"
          label="Data de Nascimento"
          placeholder="Digite sua Data de Nascimento"
          value={mockUser.data_nascimento}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-[rgba(19,81,133,0.75)] text-lighter-primary w-full sm:max-w-[250px] md:max-w-[90px]"
          disabled={true}
        />
      </div>
      {(isNameChanged || isImageChanged) && (
        <div className="flex flex-col md:flex-row gap-7 py-44">
          <Button onClick={handleCancel} text="Cancelar" className="bg-red-color px-12 py-2" />
          <Button  onClick={handleSave} text="Salvar Alterações" className="px-12 py-2" />
        </div>
      )}
    </section>
  );
};

export default ProfileEdition;
