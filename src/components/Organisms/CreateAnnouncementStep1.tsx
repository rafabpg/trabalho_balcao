import FormCard from "@/components/Atoms/FormCard"
import Label from "@/components/Atoms/Label"
import SelectField from "@/components/Atoms/SelectField"
import FormInput from "@/components/Molecules/FormInput"
import { useCreateAnnouncementContext } from "@/hooks/useCreateAnnouncementContext"
import { CategoryEnum, ItemTypeEnum, LocalizationEnum } from "@/shared/enumsForm"
import PriceInput from "../Atoms/PriceInput"
import  CurrencyInput  from   'react-currency-input-field' ;

const CreateAnnouncementStep1 = () => {

    const { register, errors } = useCreateAnnouncementContext();

    return (
        <section className="flex flex-col items-center">
            <h1 className="pb-11 text-center text-secondary font-bold text-3xl">
                Crie seu próprio Anúncio
            </h1>
            <FormCard>
                <FormInput type="text" placeholder="Nome do Anúncio"  {...register("title")}
                    error={errors.title?.message} label="Adicione seu Título" errorMessage={errors.title?.message}/>
                <div className="flex flex-col gap-3">
                    <Label children="Adicione a descrição do seu anúncio"/>
                    <textarea className="h-[152px] w-[678px]  rounded-md py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary placeholder-lighter-secondary" placeholder="Adicione  descrição do seu anúncio" 
                    {...register("description") }
                    />
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>
                <CurrencyInput
                    id="price"
                    hidden={true}
                    placeholder="R$ 0,00"
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    {...register("price")}
                />
                <div className="flex flex-col gap-3">
                    <Label children="Qual será o preço?"/>
                    <PriceInput {...register("price")}  error={errors.price?.message} className="border rounded-lg w-[678px] py-2 px-3 text-base outline-none focus:ring-2 focus:ring-primary placeholder-lighter-secondary"  />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>
                <SelectField 
                    {...register("category")}
                    options={Object.values(CategoryEnum).map(value => ({ label: value, value }))}
                    placeholder="Selecione uma categoria" 
                    label="Quais dessas categorias seu anúncio se encaixa?" 
                    className="self-start"
                    errorMessage={errors.category?.message} 
                    />
                <SelectField  
                    {...register("item_type")}
                    options={Object.values(ItemTypeEnum).map(value => ({ label: value, value }))}
                    placeholder="Selecione um tipo de item" 
                    label="Por que você esta criando esse anúncio?" 
                    className="self-start"
                    errorMessage={errors.item_type?.message} 
                    />
                <SelectField 
                    {...register("localization")}
                    options={Object.values(LocalizationEnum).map(value => ({ label: value, value }))}
                    placeholder="Selecione uma localização" 
                    label="Localização do anúncio" 
                    className="self-start"
                    errorMessage={errors.localization?.message} 
                    />
            </FormCard>
        </section>
  )
}

export default CreateAnnouncementStep1