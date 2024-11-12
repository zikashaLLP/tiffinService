import React from 'react';
import { FaStar } from 'react-icons/fa'; // Ensure you have react-icons installed

const ThaliCard = ({ title, price, imageSrc, ratingCount }) => {
  const renderStars = (ratingCount) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`h-4 w-4 ${index < ratingCount ? 'text-green-500' : 'text-gray-400'}`} />
    ));
  };

  return (
    <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg py-2 overflow-hidden w-80 md:w-32 lg:w-48 bg-white">
      <img src={imageSrc} alt={title} className=" w-3/4 mx-auto object-contain" />
      <div className="p-4">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-gray-800">{price}</div>
        <div className="flex">
          {renderStars(ratingCount)}
        </div>
      </div>
    </div>
  );
};

export default ThaliCard;
