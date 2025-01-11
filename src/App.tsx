import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/routes";
import { queryClient } from "./services/queryClient";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ToastContainer/>
    </QueryClientProvider>
  );
}

export default App;
