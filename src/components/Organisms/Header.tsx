import { useEffect, useState } from "react";
import DesktopNav from "../Molecules/DesktopNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileNav from "../Molecules/MobileNav";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)

    // const logout = () => {
    //     const cookies = document.cookie.split('; ');
    //     for (const cookie of cookies) {
    //       const [name, value] = cookie.split('=');
    //       document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:00 GMT;`;
    //     }
    //     console.log("logout");
    //     console.log(document.cookie);
    // }

    const { logout } = useAuth();

    const isMobile = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        setIsOpenMenu(false);
        setIsOpenMobileMenu(false);
        setIsOpenDropDown(false);
    }, [isMobile]);
    
    return (
        <>
            {isMobile ?
                (
                    <MobileNav
                        isOpenMenu={isOpenMobileMenu}
                        setIsOpenMenu={setIsOpenMobileMenu}
                        setIsOpenDropDown={setIsOpenDropDown}
                        isOpenDropDown={isOpenDropDown}
                        handleLogout={logout}
                    />
                ):(
                    <DesktopNav 
                        isOpen={isOpenMenu} 
                        handleLogout={logout} 
                        setIsOpenMenu={setIsOpenMenu}
                    /> 
                )
            }
        </>
    )
}

export default Header