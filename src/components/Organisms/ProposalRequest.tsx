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
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <img src={X} alt="Close" className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Proposta</h2>
          <p className="text-gray-700 font-semibold mb-4">{`Proposta de ${userName}:`}</p>
          <textarea
            readOnly
            className="border border-gray-300 rounded-md w-full p-3 text-sm text-gray-700 focus:outline-none"
            value={message}
          />

          <div className="flex justify-around mt-6">
            <button
              onClick={onReject}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Recusar
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
