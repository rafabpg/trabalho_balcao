
import UserImage from '../Atoms/UserImage'
import Button from '../Atoms/Button'
import { useNavigate } from 'react-router-dom'
import {  FaStar } from 'react-icons/fa';
import FormInput from '../Molecules/FormInput';
import user_default from "@/assets/images/user_default_profile.png"

const mockUser = {
    'name': 'John Doe',
    'image': '',
    'email': 'F8b5T@example.com',
    'cpf': '123.456.789-00',
    'data_nascimento': '01/01/2000',
    'rating':4.9
}

const ProfileDisplay = () => {

    const navigate = useNavigate()

    const renderStars = (rating:number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    size={22}
                    key={i}
                    className={`text-lg ${i <= rating ? 'text-lighter-secondary' : 'text-lighter-primary'}`}
                />
            );
        }
        return stars;
    };

    const formatCpf = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      };

    return (
        <section className='flex flex-col pl-4 md:pl-32 lg:pl-32 pt-10'>
            <div className='flex gap-6 items-center flex-wrap'>
                <UserImage src={
                    mockUser.image ? mockUser.image : user_default
                } />
                <div className='flex flex-col justify-start'>
                    <h1 className='text-3xl font-semibold text-primary-darker'>{mockUser.name}</h1>
                    <div className='flex items-center gap-1 pb-4'>
                        {renderStars(mockUser.rating)}
                        <span className="font-semibold text-xl text-primary-darker">{mockUser.rating.toFixed(1)}</span>
                    </div>
                    <Button
                        text='Meu Historico'
                        className='bg-light text-primary-default border-primary-default text-base border-2 font-bold hover:bg-primary-default hover:text-light hover:transition-all ease-in-out'
                        onClick={() => navigate('/meus-anuncios')}
                    />
                </div>
            </div>

            <div className='flex flex-wrap gap-6 pt-4'>
                <FormInput
                    type="text"
                    label="Email"
                    placeholder="Digite seu Email"
                    value={mockUser.email}
                    labelClassName='text-primary-darker text-xl font-bold'
                    className="bg-[rgba(19,81,133,0.75)] text-lighter-primary w-full sm:max-w-[250px]"
                    disabled={true}
                />
                <FormInput
                    type="text"
                    label="CPF"
                    placeholder="Digite seu CPF"
                    value={mockUser.cpf}
                    labelClassName='text-primary-darker text-xl font-bold'
                    className="bg-[rgba(19,81,133,0.75)]   text-lighter-primary w-full sm:max-w-[250px]"
                    onChange={() => formatCpf(mockUser.cpf)}
                    disabled={true}
                />
                <FormInput
                    type="text"
                    label="Data de Nascimento"
                    placeholder="Digite sua Data de Nascimento"
                    value={mockUser.data_nascimento}
                    labelClassName='text-primary-darker text-xl font-bold'
                    className="bg-[rgba(19,81,133,0.75)] text-lighter-primary w-full sm:max-w-[250px] md:max-w-[90px]"
                    disabled={true}
                />
            </div>
        </section>

  )
}

export default ProfileDisplay