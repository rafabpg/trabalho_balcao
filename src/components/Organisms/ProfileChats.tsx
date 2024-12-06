import React, { useState } from 'react';
import UserChat from '../Molecules/UserChat';
import ChatBox from '../Molecules/ChatBox';
interface Chat {
  userName: string;
  message: string;
  category: string;
  date: string;
  isNew?: boolean;
}

interface ActiveChat {
  userName: string;
  category: string;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isUserMessage: boolean;
  }>;
}

const ProfileChats: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);

  const chats: Chat[] = [
    { userName: 'Homem Peixe', message: 'Proposta nova!', category: 'Livros', date: '31/10/24', isNew: true },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
    { userName: 'Homem Ave', message: 'Negociação encerrada.', category: 'Eletrônicos', date: '31/10/24' },
  ];

  const handleOpenChat = (chat: Chat) => {
    setActiveChat({
      userName: chat.userName,
      category: chat.category,
      messages: [
        { sender: 'Homem Peixe', text: 'Olá, boa tarde!', time: '21:10', isUserMessage: false },
        { sender: 'Você', text: 'Boa tarde, como posso ajudar?', time: '21:12', isUserMessage: true },
      ],
    });
  };

  const handleAcceptProposal = (userName: string) => {
    const chat = chats.find((c) => c.userName === userName);
    if (chat) {
      handleOpenChat(chat);
    }
  };

  const handleSendMessage = (message: string) => {
    if (activeChat) {
      setActiveChat((prevChat) => {
        if (!prevChat) return null;
        return {
          ...prevChat,
          messages: [
            ...prevChat.messages,
            { sender: 'Você', text: message, time: new Date().toLocaleTimeString(), isUserMessage: true },
          ],
        };
      });
    }
  };

  const handleCloseChat = () => {
    setActiveChat(null);
  };

  return (
    <section className="flex min-h-screen bg-white">
      <div className="bg-primary-light flex flex-col w-1/4">
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
              onProposalAccepted={handleAcceptProposal}
            />
          ))}
        </div>
      </div>

      <div className="flex-grow">
        {activeChat ? (
          <ChatBox
            userName={activeChat.userName}
            category={activeChat.category}
            messages={activeChat.messages}
            onSendMessage={handleSendMessage}
            onCloseChat={handleCloseChat}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecione uma conversa para visualizar.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileChats;
