import React, { useEffect, useState } from "react";
import FormInput from "../Molecules/FormInput";
import Button from "../Atoms/Button";
import UserImage from "../Atoms/UserImage";
import user_default from "@/assets/images/user_default_profile.png";
import { useAuth } from "@/hooks/useAuth";
import usePutData from "@/hooks/usePutData";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";
import { useNotification } from "@/hooks/useNotification";

const ProfileEdition = () => {
  const { currentUser, auth } = useAuth();
  const { mutateAsync } = usePutData();

  const [name, setName] = useState<string>(currentUser?.full_name ?? "");
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string>("");

  const {showError,showSuccess} = useNotification()

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.full_name ?? "");
    }
  }, [currentUser]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameChanged(true);
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null;
  //   if (file) {
  //     convertToBase64(file).then((base64Image) => {
  //       setSelectedImage(base64Image);
  //       setSelectedImageName(file.name);
  //       setIsImageChanged(true);
  //     });
  //   }
  // };
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleSave = async () => {
    // image: selectedImage ? selectedImage.replace(/^data:image\/[a-z]+;base64,/, "") : null,
    const data = {
      ...currentUser,
      full_name: name,
    };
    try {
      await mutateAsync({
        httpClient: new AxiosHttpClientAdapter(),
        data: data,
        url: `/auth`,
        headers: auth,
      });

      showSuccess("Perfil atualizado com sucesso!");
      window.location.reload();
    } catch (error: any) {
        showError("Erro ao atualizar perfil, verifique os campos e tente novamente")
    }
    setIsNameChanged(false);
    // setIsImageChanged(false);
  };

  const handleCancel = () => {
    setName(currentUser?.full_name ?? "");
    setSelectedImage(null);
    setIsNameChanged(false);
    setIsImageChanged(false);
  };

  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <section className="flex flex-col pl-4 md:pl-32 lg:pl-32 pt-10">
      <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-24">
        <UserImage
          src={
            selectedImage ? selectedImage : currentUser?.image ?? user_default
          }
          className="w-16 h-16 md:24 md:h-24 lg:w-36 lg:h-36"
        />
        <div className="flex flex-col gap-3">
          {/* <span className="text-base md:text-xl text-primary-default">
            Escolha uma outra imagem caso queira trocar a atual
          </span>
          <div className="flex items-center rounded bg-[rgba(0,79,159,0.5)]">
            <label className="flex items-center text-white p-3 rounded cursor-pointer">
              <span className="text-sm md:text-base border border-light text-light font-bold px-4 py-2 rounded">
                Arquivo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {selectedImageName ? (
              <span className="text-light text-sm md:text-base font-bold">
                {selectedImageName}
              </span>
            ) : (
              <span className="text-light text-sm md:text-base font-bold">
                Nenhum Arquivo Escolhido
              </span>
            )}
          </div>*/}
        </div>
      </div>
      <div className="py-8">
        <FormInput
          type="text"
          label="Nome"
          placeholder="Digite seu Nome"
          value={name}
          labelClassName="text-primary-darker text-xl font-bold"
          className="bg-primary-default text-lighter-primary w-full sm:max-w-[250px]"
          onChange={handleNameChange}
        />
      </div>
      <div className="flex flex-wrap gap-6 pt-4">
        <FormInput
          type="text"
          label="Email"
          placeholder="Digite seu Email"
          value={currentUser?.email ?? ""}
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
      {(isNameChanged || isImageChanged) && (
        <div className="flex flex-col md:flex-row gap-7 py-4">
          <Button
            onClick={handleCancel}
            text="Cancelar"
            className="bg-red-color px-12 py-2"
          />
          <Button
            onClick={handleSave}
            text="Salvar Alterações"
            className="px-12 py-2"
          />
        </div>
      )}
    </section>
  );
};

export default ProfileEdition;
