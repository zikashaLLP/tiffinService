import React from 'react';
import { FaStar } from 'react-icons/fa'; // Ensure you have react-icons installed

const ThaliCard = ({ title, price, imageSrc, ratingCount }) => {
  const renderStars = (ratingCount) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`h-4 w-4 ${index < ratingCount ? 'text-green-500' : 'text-gray-400'}`} />
    ));
  };

  return (
    <div className="">
      <div className="p-4 flex flex-wrap justify-between bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ease-in-out pb-16 md:pb-24 lg:pb-28">
        <div>
          <div className="font-semibold text-lg">{title}</div>
          <div className="flex">
            {renderStars(ratingCount)}
          </div>
        </div>
        <div className="text-gray-800">{price}</div>
      </div>
      <img className="w-3/4 mx-auto object-contain -mt-14 md:-mt-20 lg:-mt-24" src={imageSrc} alt={title} />
    </div>
  );
}; 

export default ThaliCard;
