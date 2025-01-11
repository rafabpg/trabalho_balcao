import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProposalRequest from "@/components/Organisms/ProposalRequest";
import LoadingSpinner from "../Atoms/LoadingSpinner";
import api from "@/services/api";

interface Negotiation {
  id: string;
  advertisement: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    full_name: string;
  };
  proposal: string;
  status: string;
}

const fetchNegotiations = async (): Promise<Negotiation[]> => {
  const response = await api.get("/negotiations/pending");
  return response.data;
};

const acceptProposal = async (advertisementId: string, negotiationId: string) => {
  const response = await api.put(`/advertisements/${advertisementId}/negotiations/${negotiationId}`, {
    status: 'confirmed',
  });
  return response.data;
};

const rejectProposal = async (advertisementId: string, negotiationId: string) => {
  const response = await api.put(`/advertisements/${advertisementId}/negotiations/${negotiationId}`, {
    status: 'cancelled',
  });
  return response.data;
};

const ProposalsPage: React.FC = () => {
  const queryClient = useQueryClient(); // Obter o queryClient para invalidar a query

  const { data: negotiations, isLoading, isError } = useQuery<Negotiation[]>({
    queryKey: ["negotiations"],
    queryFn: fetchNegotiations,
  });

  const acceptMutation = useMutation({
    mutationFn: (data: { advertisementId: string, negotiationId: string }) => acceptProposal(data.advertisementId, data.negotiationId),
    onSuccess: () => {
      console.log("Proposta confirmada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["negotiations"] });
    },
    onError: (error: any) => {
      console.error("Erro ao aceitar proposta:", error);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (data: { advertisementId: string, negotiationId: string }) => rejectProposal(data.advertisementId, data.negotiationId),
    onSuccess: () => {
      console.log("Proposta rejeitada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["negotiations"] });
    },
    onError: (error: any) => {
      console.error("Erro ao rejeitar proposta:", error);
    }
  });

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});

  if (isLoading) return <LoadingSpinner />;
  if (!negotiations || isError) return <div>Erro ao carregar propostas.</div>;

  const handleModalOpen = (negotiationId: string) => {
    setModalState((prev) => ({ ...prev, [negotiationId]: true }));
  };

  const handleModalClose = (negotiationId: string) => {
    setModalState((prev) => ({ ...prev, [negotiationId]: false }));
  };

  return (
    <div>
      {negotiations.map((negotiation) => (
        <div key={negotiation.id}>
          <button
            onClick={() => handleModalOpen(negotiation.id)}
            className="flex flex-row items-center justify-between gap-4 border-b border-gray-300 py-3 px-4 w-full hover:bg-gray-100"
          >
            <div className="text-left">
              <p className="text-sm font-semibold text-primary-darker">
                Proposta de {negotiation.user.full_name} para {negotiation.advertisement.title}
              </p>
              <p className="text-xs text-gray-500">{negotiation.proposal}</p>
            </div>
          </button>

          {modalState[negotiation.id] && (
            <ProposalRequest
              userName={negotiation.user.full_name}
              message={negotiation.proposal}
              onClose={() => handleModalClose(negotiation.id)}
              onAccept={() => acceptMutation.mutate({ advertisementId: negotiation.advertisement.id, negotiationId: negotiation.id })}
              onReject={() => rejectMutation.mutate({ advertisementId: negotiation.advertisement.id, negotiationId: negotiation.id })}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalsPage;
