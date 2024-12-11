import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/routes";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
