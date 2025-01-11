import { toast } from "react-toastify";

export const useNotification = () => {
    const showSuccess = (message: string, options = {}) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        ...options,
      });
    };
  
    const showError = (message: string, options = {}) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        ...options,
      });
    };
  
    return { showSuccess, showError };
  };