import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full p-32">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent border-secondary rounded-full" role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;