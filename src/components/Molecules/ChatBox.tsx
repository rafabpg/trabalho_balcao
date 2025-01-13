import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import RatingModal from "../Organisms/RatingModal";
import { useNotification } from "@/hooks/useNotification";

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

const ChatBox: React.FC<ChatBoxProps> = ({
  userName,
  category,
  messages,
  onSendMessage,
  onCloseChat,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const {showSuccess} = useNotification()
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleCloseChat = () => {
    setDropdownOpen(false);
    setIsRatingModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300 relative">
        <div>
          <h2 className="font-semibold text-lg">{userName}</h2>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FaEllipsisV className="text-xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                onClick={handleCloseChat}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Encerrar Chat
              </button>
              <button
                onClick={() => showSuccess("Excluir conversa clicado")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Excluir Conversa
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUserMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                message.isUserMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 p-3 bg-gray-100 sticky bottom-0">
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

      {isRatingModalOpen && (
        <RatingModal
          onClose={() => {
            setIsRatingModalOpen(false);
            onCloseChat();
          }}
        />
      )}
    </div>
  );
};

export default ChatBox;
