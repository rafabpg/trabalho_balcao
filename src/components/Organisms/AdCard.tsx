import { Ad} from '@/shared/announcement';
import { CategoryEnum, LocalizationEnum } from '@/shared/enumsForm';
import React from 'react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <div className="w-full md:w-72 lg:w-80 bg-white shadow-md rounded-lg border border-blue-950 overflow-hidden flex flex-col">
      <div className="relative h-40">
        <img src={ad.images_urls ? ad.images_urls[0] : ''} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex items-center p-1 rounded-lg">
          <img src={''} className="w-10 h-10 rounded-full bg-gray-800" />
          <div className="ml-2">
            <h3 className="text-sm font-semibold">{ad.user?.full_name}</h3>
            <div className="flex items-center">
              <FaStar className="text-yellow-500" size={14} />
              <span className="ml-1 text-sm font-medium">{ad.user?.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-950 text-white flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{ad.title}</h4>
          <span className="text-xs">{ad.created_at}</span>
        </div>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="mr-1" size={14} />
          <span className="text-sm">{LocalizationEnum[ad.campus.toUpperCase() as keyof typeof LocalizationEnum]}</span>
        </div>
        <p className="text-sm">{CategoryEnum[ad.category.toUpperCase() as keyof typeof CategoryEnum]}</p>
      </div>

      <div className="p-4 bg-blue-950 text-white rounded-b-lg flex justify-between items-center">
        <span className="text-lg font-bold">R$ {ad.price}</span>
        <Link className="px-4 py-1 bg-blue-950 text-white border border-white rounded-lg hover:bg-white hover:text-blue-950 transition-colors" to={'/anuncio/' + ad.id}>
          Ver Mais
        </Link>
      </div>
    </div>
  );
};

export default AdCard;
