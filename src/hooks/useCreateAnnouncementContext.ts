import { CreateAnnouncementContext, CreateAnnouncementContextProps } from "@/context/CreateAnnouncementContext";
import { useContext } from "react";

export const useCreateAnnouncementContext = (): CreateAnnouncementContextProps => {
    const context = useContext(CreateAnnouncementContext);
    if (!context) {
        throw new Error("useCreateAnnouncementContext deve ser usado dentro de um CreateAnnouncementProvider");
    }
    return context;
};