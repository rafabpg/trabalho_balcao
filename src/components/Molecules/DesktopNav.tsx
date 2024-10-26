import DesktopUserWindow from './DesktopUserWindow'
import NavLinkItem from '../Atoms/NavLinkItem'
import { VscAccount } from 'react-icons/vsc'
import Logo from "@/assets/icons/logo_uff.svg"

interface DesktopNavProps {
    isOpen: boolean
    handleLogout: () => void
    setIsOpenMenu: (open: boolean) => void;
}

const DesktopNav = ({isOpen, handleLogout,setIsOpenMenu}:DesktopNavProps) => {

    return (
        <header className='bg-primary-default flex flex-row py-2 px-8 md:px-28 lg:px-28 justify-between items-center'>
            <img src={Logo}  alt="Logo UFF" className="w-24 h-10 "/>
            <nav className="">
                <ul className="flex flex-row gap-8 items-center text-light font-semibold hover:*:-translate-y-1 [&>*]:transition-all [&>*]:ease-in-out text-base">
                    <NavLinkItem link="/" children="Anúncios"/>
                    <NavLinkItem link="/meus-anuncios" children="Meus Anúncios"/>
                    <NavLinkItem link="/criar-anuncios" children="Criar Anúncio"/>
                    <li>
                        <i className="cursor-pointer" onClick={() => setIsOpenMenu(!isOpen)}>
                            <VscAccount color="#FFFFFF" size={32}/>
                        </i>
                    </li>
                </ul>
            </nav>
            <DesktopUserWindow isOpen={isOpen} handleLogout={handleLogout} />  
        </header>
    )
}

export default DesktopNav