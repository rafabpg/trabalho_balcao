import FormCard from '../Atoms/FormCard'
import MultiImageUpload from '../Atoms/MultiImages';
import FormInput from '../Molecules/FormInput'
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext'

const CreateAnnouncementStep2 = () => {
  const { register, errors} = useCreateAnnouncementContext();

  return (
    <section className="flex flex-col items-center">
        <h1 className="pb-11 text-center text-secondary font-bold text-3xl">
            Crie seu próprio Anúncio
        </h1>
        <FormCard >
          <h2 className="text-3xl text-light font-bold">Informações Adicionais para seu Anúncio</h2>
          <div className="flex flex-col gap-10">
            <div className="flex gap-4">
              <FormInput 
                type="text" 
                placeholder="(xx) 99999-9999" 
                label="Digite o telefone para contato" 
                {...register("phone")} 
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
                {...register("email")} 
                error={errors.email?.message} 
                label="Digite o email para contato" 
                errorMessage={errors.email?.message} 
              />
            </div>
            {/* <MultiImageUpload /> */}
          </div>
        </FormCard>
    </section>
  )
}

export default CreateAnnouncementStep2;
