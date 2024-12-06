import React, { useState } from 'react';

interface Message {
  sender: string;
  text: string;
  time: string;
  isUserMessage: boolean;
}

interface ChatBoxProps {
  userName: string;
  category: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onCloseChat: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ userName, category, messages, onSendMessage, onCloseChat }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[800px] border-l border-gray-300 bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300">
        <div>
          <h2 className="font-semibold text-lg">{userName}</h2>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <button
          onClick={onCloseChat}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          Encerrar
        </button>
      </div>

      <div className="flex flex-col flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUserMessage ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                message.isUserMessage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 p-3">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
