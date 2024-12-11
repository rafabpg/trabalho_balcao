import { SlMenu } from "react-icons/sl";
import {  IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import NavLinkItem from "../Atoms/NavLinkItem";
import Logo from "@/assets/icons/logo_uff.svg"
import MeuPerfilIcon from "@/assets/icons/icon_meu_perfil.svg"

interface MobileNavProps {
    isOpenMenu: boolean
    setIsOpenMenu: (open: boolean) => void
    setIsOpenDropDown: (open: boolean) => void
    isOpenDropDown: boolean
    handleLogout: () => void
}

const MobileNav = ({
        isOpenMenu,
        setIsOpenMenu,
        setIsOpenDropDown, 
        isOpenDropDown, 
        handleLogout
    }:MobileNavProps) => {

  return (
    <>
        <header className="flex justify-between items-center bg-primary-default px-8 p-4">
            <img src={Logo} alt="Logo UFF" className="w-24 h-10" />
            <div onClick={() => setIsOpenMenu(!isOpenMenu)} className="cursor-pointer">
                <div className={`transition-transform duration-300 ease-in-out transform ${isOpenMenu ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpenMenu ? (
                        <IoMdClose size={37} color="#FFFFFF" />
                    ) : (
                        <SlMenu size={32} color="#FFFFFF" />
                    )}
                </div>
            </div>
        </header>

        {isOpenMenu && (
            <nav className="w-full bg-primary-default border-t border-b  border-opacity-20 border-light ">
                <ul className=" flex flex-col gap-4  text-light font-semibold text-base p-4 items-center">
                  <NavLinkItem  link="/" children="Anúncios" />
                  <NavLinkItem link="/meus-anuncios" children="Meus Anúncios" />
                  <NavLinkItem link="/criar-anuncios" children="Criar Anúncios" />
                  <li className="relative">
                    <div 
                      onClick={() => setIsOpenDropDown(!isOpenDropDown)} 
                      className="flex items-center cursor-pointer gap-2 px-4 py-2"
                    >
                      <VscAccount color="#FFFFFF" size={26} />
                      <span>Jão Pernalonga</span>
                      <i className={`transition-transform ${isOpenDropDown ? 'rotate-180' : 'rotate-0'}`}>
                        <RiArrowDropDownLine color="#FFFFFF" size={32} />
                      </i>
                    </div>

                    {isOpenDropDown && (
                      <ul className="w-full bg-primary-default border-t border-opacity-20 border-light py-2 flex flex-col gap-3 items-start">
                        <Link to="/meu-perfil" className="flex gap-3 items-center px-4 hover:bg-opacity-10 hover:bg-primary-light transition-colors w-full py-2">
                          <img src={MeuPerfilIcon} alt="Ícone de Meu Perfil" className="w-6 h-6" />
                          <span>Meu Perfil</span>
                        </Link>
                        <Link to="/login" onClick={handleLogout} className="flex gap-3 items-center px-4 hover:bg-opacity-10 hover:bg-primary-light transition-colors w-full py-2">
                          <FiLogOut color="#FFFFFF" size={22} />
                          <span>Logout</span>
                        </Link>
                      </ul>
                    )}
                  </li>

                </ul>
            </nav>
        )}
    </>
  );
}

export default MobileNav