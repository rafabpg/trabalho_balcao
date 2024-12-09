import { useState } from "react";
import X from "@/assets/icons/X.svg";
import Star from "@/assets/icons/Star 3.png";
import fadedStar from "@/assets/icons/Star 2.png";
import Text from "@/assets/icons/textbubble.png";
import Button from "../Atoms/Button";

interface RatingModalProps {
  onClose: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ onClose }) => {
  const [rating, setRating] = useState(1);
  const [opinion, setOpinion] = useState("");

  const submit = () => {
    console.log("Avaliação enviada:", { rating, opinion });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white relative z-10 p-6 w-[500px] max-w-full rounded-md shadow-lg border-2 border-lighter-primary">
        <button
          className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center"
          onClick={onClose}
        >
          <img className="w-6 h-6" src={X} alt="Close" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">AVALIAÇÃO</h2>
          <p className="text-lg mb-4">O que você achou do anúncio?</p>
          <p className="text-base text-lighter-primary mb-6">
            Escolha 1 a 5 estrelas para classificar.
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className="h-12 w-12"
              >
                <img
                  className="object-cover"
                  src={rating >= value ? Star : fadedStar}
                  alt={`Rating ${value}`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <img className="h-6 w-6" src={Text} alt="Opinion" />
            <span className="text-lg">Deixe sua opinião</span>
          </div>
          <textarea
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            maxLength={300}
            className="w-full border border-gray-300 rounded-md p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Conte sua experiência (opcional)"
          />
          <div className="text-right text-sm text-gray-400 mb-4">
            {opinion.length}/300
          </div>
          <Button
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            text="ENVIAR"
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
