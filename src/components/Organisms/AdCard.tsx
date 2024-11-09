import React from 'react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface AdCardProps {
  userName: string;
  userImage: string;
  rating: number;
  adTitle: string;
  adDate: string;
  adImage: string;
  location: string;
  category: string;
  price: string;
}

const AdCard: React.FC<AdCardProps> = ({
  userName,
  userImage,
  rating,
  adTitle,
  adDate,
  adImage,
  location,
  category,
  price,
}) => {
  return (
    <div className="w-full md:w-72 lg:w-80 bg-white shadow-md rounded-lg border border-blue-950 overflow-hidden">
      <div className="relative">
        <img src={adImage} className="w-full h-40 object-cover" />
        <div className="absolute top-2 left-2 flex items-center p-1 rounded-lg">
          <img src={userImage} className="w-10 h-10 rounded-full bg-gray-800" />
          <div className="ml-2">
            <h3 className="text-sm font-semibold">{userName}</h3>
            <div className="flex items-center">
              <FaStar className="text-yellow-500" size={14} />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-950 text-white">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{adTitle}</h4>
          <span className="text-xs">{adDate}</span>
        </div>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="mr-1" size={14} />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-sm">{category}</p>
      </div>

      <div className="p-4 bg-blue-950 text-white rounded-b-lg flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <a href="anuncio/001" className="px-4 py-1 bg-blue-950 text-white border border-white rounded-lg hover:bg-white hover:text-blue-950 transition-colors">
          Ver Mais
        </a>
      </div>
    </div>
  );
};

export default AdCard;
