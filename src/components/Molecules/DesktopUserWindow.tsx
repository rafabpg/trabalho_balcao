import { FiLogOut } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import MeuPerfilIcon from "@/assets/icons/icon_meu_perfil.svg";
import { IoChatboxOutline, IoMail, IoMailOutline } from "react-icons/io5";
import LinkItem from "../Atoms/LinkItem";
import { useEffect, useRef } from "react";

interface DesktopUserWindowProps {
  isOpen: boolean;
  handleLogout: () => void;
  fullName?: string;
  setIsOpen: (open: boolean) => void;
}

const DesktopUserWindow = ({
  isOpen,
  handleLogout,
  fullName,
  setIsOpen,
}: DesktopUserWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    isOpen && (
      <nav
        ref={windowRef}
        className="fixed right-1 rounded-xl top-16 bg-primary-default p-4 shadow-lg py-3 pr-24"
      >
        <ul className="flex flex-col [&>*]:flex [&>*]:items-center [&>*]:gap-3 gap-5 text-light font-semibold text-base">
          <li>
            <i>
              <VscAccount color="#FFFFFF" size={22} />
            </i>
            <p>{fullName}</p>
          </li>
          <li>
            <LinkItem
              to="/meu-perfil"
              children="Meu Perfil"
              icon={<img src={MeuPerfilIcon} alt="Icone de Meu Perfil" />}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li>
            <LinkItem
              to="/meu-perfil/propostas"
              children="Novas Propostas"
              icon={<IoMailOutline color="#FFFFFF" size={21} />}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li>
            <LinkItem
              to="/meu-perfil/chats"
              children="Meus Chats"
              icon={<IoChatboxOutline color="#FFFFFF" size={21} />}
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className="pt-2">
            <LinkItem
              to="/login"
              children="Logout"
              onClick={handleLogout}
              icon={<FiLogOut color="#FFFFFF" size={22} />}
            />
          </li>
        </ul>
      </nav>
    )
  );
};

export default DesktopUserWindow;
