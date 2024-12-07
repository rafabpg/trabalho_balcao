import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface AdListProps {
  adTitle: string;
  location: string;
  category: string;
  price: string;
  isCreatedByUser: boolean; 
  onDelete: () => void; // Função de exclusão (mockada) trocar na integração com a API
  onEdit: () => void; // Função de edição (mockada) trocar na integração com a API
}

const AdList: React.FC<AdListProps> = ({
  adTitle,
  location,
  category,
  price,
  isCreatedByUser,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex items-center w-full max-w-4xl mx-auto bg-blue-950 text-white p-3 mb-1.5 rounded-lg shadow-md">
      <div className="w-1/5 flex-shrink-0">
        <h4 className="font-semibold text-md">{adTitle}</h4>
      </div>

      <div className="w-1/6 text-center flex-shrink-0">
        <span className="bg-white text-blue-950 px-2 py-0.5 rounded-md text-sm">{location}</span>
      </div>

      <div className="w-1/6 text-center flex-shrink-0">
        <span className="bg-white text-blue-950 px-2 py-0.5 rounded-md text-sm">{category}</span>
      </div>

      <div className="w-1/6 text-right flex-shrink-0">
        <span className="text-lg font-bold">{price}</span>
      </div>

      <div className="flex space-x-2 w-1/3 justify-end">
        {isCreatedByUser ? (
          <>
            <button
              onClick={onDelete}
              className="bg-red-600 w-9 h-9 flex items-center justify-center rounded-md hover:bg-red-700 transition"
            >
              <FaTrash />
            </button>
            <button
              onClick={onEdit}
              className="bg-blue-500 w-9 h-9 flex items-center justify-center rounded-md hover:bg-blue-600 transition"
            >
              <FaEdit />
            </button>
          </>
        ) : null}
        <a
          href="anuncio/001"
          className="px-3 py-1 bg-transparent border border-white rounded-md hover:bg-white hover:text-blue-950 transition flex items-center justify-center"
        >
          Ver Mais
        </a>
      </div>
    </div>
  );
};

export default AdList;
