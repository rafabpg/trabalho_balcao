import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import LoadingSpinner from "../Atoms/LoadingSpinner";

interface Transaction {
  id: string;
  proposal: string;
  status: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/transactions");
  return response.data;
};

const ProposalsPage: React.FC = () => {
  const { data: transactions, isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erro ao carregar as propostas. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Minhas Propostas</h1>

      {transactions && transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">
                Proposta #{transaction.id}
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Proposta:</span> {transaction.proposal}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Status:</span> {transaction.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700">
          Nenhuma proposta encontrada.
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;
