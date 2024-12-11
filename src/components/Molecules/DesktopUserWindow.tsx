import { FiLogOut } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import MeuPerfilIcon from "@/assets/icons/icon_meu_perfil.svg"
import { IoChatboxOutline } from "react-icons/io5";
import LinkItem from "../Atoms/LinkItem";

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
                        <LinkItem to="/meu-perfil" children="Meu Perfil" icon={<img src={MeuPerfilIcon} alt="Icone de Meu Perfil" />} />
                    </li>
                    <li>
                        <LinkItem to="/meu-perfil/chats" children="Meus Chats" icon={<IoChatboxOutline color="#FFFFFF" size={21} />} />
                    </li>
                    <li className="pt-2">
                        <LinkItem to="/login" children="Logout" onClick={handleLogout} icon={<FiLogOut color="#FFFFFF" size={22} />} />
                    </li>
                </ul>
            </nav>
        )
    );
}

export default DesktopUserWindow