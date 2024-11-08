import { createAnnouncementSchema } from "@/schemas/createAnnouncementSchema";
import { createContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiAdvertisement } from "@/services/advertisement";

type CreateAnnouncementData = z.infer<typeof createAnnouncementSchema>;

export interface CreateAnnouncementContextProps {
    formData: CreateAnnouncementData;
    stepState: number;
    setStepState: (step: number) => void;
    isStepValid: boolean;
    onSubmit: () => void; 
    register: any;
    errors: any;
}

export const CreateAnnouncementContext = createContext<CreateAnnouncementContextProps | undefined>(undefined);

interface CreateAnnouncementProviderProps {
    children: React.ReactNode;
}

export const CreateAnnouncementProvider = ({ children }: CreateAnnouncementProviderProps) => {
    const { register,  formState: { errors }, trigger,getValues,watch   } = useForm<CreateAnnouncementData>({
        resolver: zodResolver(createAnnouncementSchema),
        mode: "onChange",
    });
    const {createAdvertisement} = apiAdvertisement();

    const [stepState, setStepState] = useState<number>(1);
    const [isStepValid , setIsStepValid] = useState<boolean>(false);

    const requiredFields: Array<keyof CreateAnnouncementData> = stepState === 1
    ? ['title', 'description','price', 'category','item_type', 'localization']
    : ['email', 'phone'];


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

            console.log("Submit", validatedData);
            // createAdvertisement(bodydata);
        } catch (error) {
        }
    };

    return (
        <CreateAnnouncementContext.Provider
            value={{
                formData:getValues(),
                stepState,
                setStepState,
                isStepValid,
                onSubmit,
                register,
                errors}
            }>
            {children}
        </CreateAnnouncementContext.Provider>
    );
};

