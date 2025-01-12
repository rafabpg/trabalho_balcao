import { useEffect, useState } from "react";
import DesktopNav from "../Molecules/DesktopNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileNav from "../Molecules/MobileNav";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  const { logout, currentUser } = useAuth();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsOpenMenu(false);
    setIsOpenMobileMenu(false);
    setIsOpenDropDown(false);
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <MobileNav
          isOpenMenu={isOpenMobileMenu}
          setIsOpenMenu={setIsOpenMobileMenu}
          setIsOpenDropDown={setIsOpenDropDown}
          isOpenDropDown={isOpenDropDown}
          handleLogout={logout}
          fullName={currentUser?.full_name}
        />
      ) : (
        <DesktopNav
          isOpen={isOpenMenu}
          handleLogout={logout}
          setIsOpenMenu={setIsOpenMenu}
          fullName={currentUser?.full_name}
        />
      )}
    </>
  );
};

export default Header;
