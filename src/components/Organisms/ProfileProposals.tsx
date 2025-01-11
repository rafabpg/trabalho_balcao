import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProposalRequest from "@/components/Organisms/ProposalRequest";
import LoadingSpinner from "../Atoms/LoadingSpinner";
import api from "@/services/api";

interface Transaction {
  id: string;
  proposal: string;
  status: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/negotiations/pending");
  return response.data;
};

const ProposalsPage: React.FC = () => {
  const { data: transactions, isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});

  if (isLoading) return <LoadingSpinner />;
  if (!transactions || isError) return <div>Erro ao carregar propostas.</div>;

  const handleModalOpen = (transactionId: string) => {
    setModalState((prev) => ({ ...prev, [transactionId]: true }));
  };

  const handleModalClose = (transactionId: string) => {
    setModalState((prev) => ({ ...prev, [transactionId]: false }));
  };

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <button
            onClick={() => handleModalOpen(transaction.id)}
            className="flex flex-row items-center justify-between gap-4 border-b border-gray-300 py-3 px-4 w-full hover:bg-gray-100"
          >
            <div className="text-left">
              <p className="text-sm font-semibold text-primary-darker">
                Proposta {transaction.id}
              </p>
              <p className="text-xs text-gray-500">{transaction.proposal}</p>
            </div>
          </button>

          {modalState[transaction.id] && (
            <ProposalRequest
              userName={`Usuário ${transaction.id}`}
              message={transaction.proposal}
              onClose={() => handleModalClose(transaction.id)}
              onAccept={() => console.log('a')}
              onReject={() => console.log('b')}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalsPage;
