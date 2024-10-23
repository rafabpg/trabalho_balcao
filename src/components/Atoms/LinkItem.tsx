import { Link } from "react-router-dom";

interface LinkItemProps {
    to: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
}

const LinkItem = ({ to, icon, children, onClick }: LinkItemProps) => {
    return (
        <Link to={to} onClick={onClick} className="flex gap-3 items-center">
            <i>{icon}</i>
            {children}
        </Link>
    );
};

export default LinkItem;
