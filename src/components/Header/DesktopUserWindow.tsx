import { FiLogOut } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import MeuPerfilIcon from "@/assets/icon_meu_perfil.svg"

interface DesktopUserWindowProps {
    isOpen: boolean
    handleLogout: () => void
}


const DesktopUserWindow = ({ isOpen, handleLogout }:DesktopUserWindowProps) => {
    return (
        isOpen && (
            <nav className="fixed right-1 rounded-xl top-16  bg-primary-default p-4 shadow-lg py-3 pr-24">
                <ul className="flex flex-col [&>*]:flex [&>*]:items-center [&>*]:gap-3 gap-5 text-light font-semibold [&.second-childs]:cursor-pointer text-base">
                    <li>
                        <i><VscAccount color="#FFFFFF" size={22} /></i>
                        <p>Jão Pernalonga</p>
                    </li>
                    <li>
                        <Link to="/meu-perfil" className="flex gap-3 items-center">
                            <i><img src={MeuPerfilIcon} alt="Icone de Meu Perfil" /></i>
                            Meu Perfil
                        </Link>
                    </li>
                    <li className="pt-3">
                        <Link to="/login" onClick={handleLogout} className="flex gap-3 items-center">
                            <i><FiLogOut color="#FFFFFF" size={22} /></i>
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    );
}

export default DesktopUserWindow