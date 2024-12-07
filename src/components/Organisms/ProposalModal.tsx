import React from 'react';
import X from "@/assets/icons/X.svg";

interface ProposalModalProps {
  onClose: () => void;
  sellerName: string;
  productPrice: number;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ onClose, sellerName, productPrice }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <img src={X} alt="Close" className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Envie sua Proposta</h2>
          <p className="text-gray-700 text-sm mb-4">
            Você enviará uma proposta para o anunciante <span className="font-semibold">{sellerName}</span>, na qual poderá perguntar se ele faz algum desconto e negociar questões de entrega e pagamento.
            <br />
            O valor do produto anunciado é <span className="font-semibold">{`R$${parseFloat(productPrice.toString()!).toFixed(2).toString()}`}</span>.
            Não aceite valores maiores que esse.
          </p>
          <p className="text-gray-700 text-sm mb-4">
            Ao enviar esta proposta, você concorda com todos os <span className="font-semibold">termos e serviços</span> da plataforma.
            Caso o anunciante aceite, ambos estarão sob um contrato de negociação e poderão se avaliar ao final, independentemente do fechamento do acordo.
          </p>

          <textarea
            className="border border-gray-300 rounded-md w-full p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escreva sua proposta aqui..."
          />

          <button
            onClick={() => {
              console.log("Proposta enviada");
              onClose();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar Proposta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
