import React from 'react';

const WelcomeBanner: React.FC = () => {
  return (
    <section className="bg-blue-950 text-white py-6 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold">Bem-vindo à Plataforma de Anúncios da UFF!</h1>
        <p className="mt-2">
          Aqui você pode criar, buscar e gerenciar anúncios de forma simples e segura. Utilize os filtros de categoria, localização e preço para encontrar exatamente o que procura. 
          Lembre-se: a segurança é nossa prioridade. Utilize o sistema de mensagens para se comunicar com os anunciantes, garantindo a privacidade de todos.
        </p>
        <p className="mt-2">
          Participe, faça sua transação e ajude a construir uma comunidade confiável, avaliando suas interações!
        </p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
