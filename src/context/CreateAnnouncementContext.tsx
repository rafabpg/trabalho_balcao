import { createAnnouncementSchema } from "@/schemas/createAnnouncementSchema";
import { createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/hooks/usePostData";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";
import { getCookieValue } from "@/utils/getCookiesAux";

type CreateAnnouncementData = z.infer<typeof createAnnouncementSchema>;

export interface CreateAnnouncementContextProps {
  formData: CreateAnnouncementData;
  stepState: number;
  setStepState: (step: number) => void;
  isStepValid: boolean;
  onSubmit: () => void;
  register: any;
  setValue: any;
  errors: any;
}

export const CreateAnnouncementContext = createContext<
  CreateAnnouncementContextProps | undefined
>(undefined);

interface CreateAnnouncementProviderProps {
  children: React.ReactNode;
}

export const CreateAnnouncementProvider = ({
  children,
}: CreateAnnouncementProviderProps) => {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<CreateAnnouncementData>({
    resolver: zodResolver(createAnnouncementSchema),
    mode: "onChange",
  });

  const { mutateAsync } = usePostData();

  const [stepState, setStepState] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);

  const requiredFields: Array<keyof CreateAnnouncementData> =
    stepState === 1
      ? ["title", "description", "category", "item_type", "campus"]
      : ["email_contact", "phone_contact"];

  const watchedFields = watch(requiredFields);

  useEffect(() => {
    const allFieldsFilled = requiredFields.every((field) => {
      const value = getValues(field);
      return value && value.toString().trim() !== "";
    });

    setIsStepValid(allFieldsFilled);
  }, [watchedFields, getValues, requiredFields]);

  const onSubmit = async () => {
    const formData = getValues();
    try {
      formData.user_id = "cd34153f-c45f-46e7-a447-47c25a7a1a2f";
      const client_auth = getCookieValue("auth", "client");
      const uid_auth = getCookieValue("auth", "uid");
      const token_acess_auth = getCookieValue("auth", "accessToken");
      const validatedData = await createAnnouncementSchema.parseAsync(formData);
      await mutateAsync({
        httpClient: new AxiosHttpClientAdapter(),
        data: validatedData,
        url: "/advertisements",
        headers: {
          "access-token": token_acess_auth?.trim(),
          client: client_auth?.trim(),
          uid: uid_auth?.trim(),
        },
      });
      alert("Anuncio criado com sucesso!");
      reset();
      setStepState(1);
    } catch (error: any) {
      alert(
        `Erro ao criar anúncio: ${error.errors
          .map((err) => err.message)
          .join(", ")}`
      );
    }
  };

  return (
    <CreateAnnouncementContext.Provider
      value={{
        formData: getValues(),
        stepState,
        setStepState,
        isStepValid,
        onSubmit,
        register,
        setValue,
        errors,
      }}
    >
      {children}
    </CreateAnnouncementContext.Provider>
  );
};
