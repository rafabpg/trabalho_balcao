import { createAnnouncementSchema } from "@/schemas/createAnnouncementSchema";
import { createContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostData from "@/hooks/usePostData";
import { AxiosHttpClientAdapter } from "@/services/axiosAdapter";

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
    trigger,
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
      ? [
          "title",
          "description",
          "price",
          "category",
          "item_type",
          "campus",
        ]
      : ["email_contact", "phone_contact", "images"];

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
      const validatedData = await createAnnouncementSchema.parseAsync(formData);
      console.log("validatedData", validatedData);
      // const response = await mutateAsync({
      //   httpClient: new AxiosHttpClientAdapter(),
      //   data: validatedData,
      //   url: "/user",
      // });
      alert("Anuncio criado com sucesso!");
      reset()
      setStepState(1)
    } catch (error:any) {
      alert(`Erro ao criar anúncio: ${error.errors.map(err => err.message).join(", ")}`); 
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
