import NavLinkItem from '../Atoms/NavLinkItem'
import LinkItem from '../Atoms/LinkItem'
import { FiLogOut } from 'react-icons/fi'

const ProfileSidebar = () => {
  return (
    <nav className='px-6 lg:px-14 bg-secondary pt-8 min-h-screen'>
        <ul className='flex flex-col gap-6 text-base lg:text-xl  items-center text-light font-semibold hover:*:-translate-y-1 [&>*]:transition-all [&>*]:ease-in-out gap-'>
            <NavLinkItem children="Meu Perfil" link="/meu-perfil" />
            <NavLinkItem children="Editar Perfil" link="/meu-perfil/editar" />
            <NavLinkItem children="Novas Propostas" link="/meu-perfil/propostas" />
            <NavLinkItem children="Meus Chats" link="/meu-perfil/chats" />
            <LinkItem to="/login" children="Logout" icon={<FiLogOut color="#FFFFFF" size={22} />}   />
        </ul>
    </nav>
  )
}

export default ProfileSidebar