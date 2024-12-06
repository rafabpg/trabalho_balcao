import React from 'react';
import X from "@/assets/icons/X.svg";

interface ProposalRequestProps {
  userName: string;
  message: string;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const ProposalRequest: React.FC<ProposalRequestProps> = ({ userName, message, onClose, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <img src={X} alt="Close" className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Proposta Recebida</h2>
          <p className="text-gray-700 font-medium mb-4">
            Você recebeu uma proposta de <span className="font-semibold text-primary-darker">{userName}</span>. 
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Ao aceitar esta proposta, você estará sob um contrato de negociação e aceitará os termos de uso da plataforma. Mesmo que a negociação não seja concluída, ambas as partes poderão se avaliar no final.
          </p>
          <textarea
            readOnly
            className="border border-gray-300 rounded-md w-full p-3 text-sm text-gray-700 focus:outline-none mb-4"
            value={message}
          />

          <div className="flex justify-around mt-4">
            <button
              onClick={onReject}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Recusar
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalRequest;
