import { useEffect, useState } from "react";
import DesktopNav from "./DesktopNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileNav from "./MobileNav";

const Header = () => {

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)

    const handleLogout = () => {
        console.log("Logout")
    }   

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
                        handleLogout={handleLogout}
                    />
                ):(
                    <DesktopNav 
                        isOpen={isOpenMenu} 
                        handleLogout={handleLogout} 
                        setIsOpenMenu={setIsOpenMenu}
                    /> 
                )
            }
        </>
    )
}

export default Header