import Logo from "@/assets/icons/logo_uff.svg";

const Footer = () => {
    return (
        <footer className="bg-primary-default flex justify-between items-center py-2 px-8 md:px-28 lg:px-28">
            <img src={Logo} alt="Logo UFF" className="w-24 h-10" />
            <p className="text-gray-400 text-base font-semibold">Copyright © 2024 • Grupo 04.</p>
        </footer>
    );
};

export default Footer;
