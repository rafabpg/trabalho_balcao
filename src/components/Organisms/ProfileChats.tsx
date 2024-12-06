import UserChat from '../Molecules/UserChat';

const ProfileChats = () => {
  const chats = [
    { userName: 'Homem Peixe', message: 'Proposta nova!', category: 'Livros', date: '31/10/24', isNew: true },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
  ];

  return (
    <section className="flex flex-row min-h-screen bg-white">
      <div className="bg-primary-light flex flex-col w-full max-w-md">
        <header className="p-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-bold text-primary-darker">Conversas</h1>
        </header>
        <div className="flex flex-col">
          {chats.map((chat, index) => (
            <UserChat
              key={index}
              userName={chat.userName}
              message={chat.message}
              category={chat.category}
              date={chat.date}
              isNew={chat.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileChats;
