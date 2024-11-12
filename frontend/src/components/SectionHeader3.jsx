import React from 'react';


const SectionHeader3 = ({ text, color, textColor }) => {
  
  return (
    <div className={`bg-${color} text-center text-${textColor}`}>
      <div className="relative mx-auto md:w-96 h-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-${textColor} text-2xl md:text-3xl font-medium leading-none`}>Clients</span>
          <span className={`text-${textColor} text-2xl md:text-3xl leading-none mx-4 special-font text-primary`}>Say</span> 
          {/* <span className={`text-${textColor} text-2xl md:text-3xl font-medium leading-none`}>Work</span> */}
        </div>
        
        {/* Decorative lines */}
        <img
          className="absolute top-4 right-0 w-20 h-3"
          alt="Line decoration"
          src={'/Line1Gr.svg'}
        />
        <img
          className="absolute top-4 left-0 w-20 h-3"
          alt="Line decoration"
          src={'/Line2Gr.svg'}
        />
      </div>
      <p className="font-light text-xl md:w-1/3 mt-4 mx-auto text-justify text-gray-400">{text}</p>
    </div>
  );
};

export default SectionHeader3;
