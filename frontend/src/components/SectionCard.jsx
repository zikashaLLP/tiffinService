import React from "react";

export const SectionCard = ({ svgPath, title, content }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 relative w-full md:w-96 shadow-xl h-64">
      <img src={svgPath} alt="Svg Icon" className="h-16 w-16 mx-auto" />
      <div className="text-center font-bold text-md md:text-xl lg:text-2xl  text-gray-900 mt-8">{title}</div>
      <p className="text-center text-sm text-gray-600 mt-4">
        {content}
      </p>
    </div>
  );
};
