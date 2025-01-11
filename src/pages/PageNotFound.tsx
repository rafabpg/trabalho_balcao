import Button from "@/components/Button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-700 mt-4">Página não encontrada</p>
      <p className="text-gray-600 mt-2">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="pt-4">
        <Button
          text={"Voltar para a página inicial"}
        />
      </Link>
    </div>
  );
};

export default PageNotFound;
