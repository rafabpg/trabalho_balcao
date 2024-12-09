import { AuthContext, AuthContextProps } from "@/context/AuthContext";
import { useContext } from "react";


export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
  