import React from 'react';


const SectionHeader = ({ text, color, textColor }) => {
  
  return (
    <div className={`bg-${color} text-center text-${textColor}`}>
      <div className="relative mx-auto md:w-96 h-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-${textColor} text-2xl md:text-3xl font-medium leading-none`}>Special</span>
          <span className={`text-${textColor} text-2xl md:text-3xl leading-none ml-4 special-font`}>Tiffin</span>
        </div>
        
        {/* Decorative lines */}
        <img
          className="absolute top-4 right-0 w-20 h-3"
          alt="Line decoration"
          src={'/Line1.svg'}
        />
        <img
          className="absolute top-4 left-0 w-20 h-3"
          alt="Line decoration"
          src={'Line2.svg'}
        />
      </div>
      <p className="font-light text-xl text-center md:w-[500px] mx-auto">{text}</p>
    </div>
  );
};

export default SectionHeader;
