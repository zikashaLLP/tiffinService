import React from 'react';

const DeliveryBoyCard = ({ deliveryBoy, onSelect }) => {
    return (
        <div className="card bg-white hover:bg-blue-100 cursor-pointer shadow-md rounded-lg overflow-hidden transition duration-150 ease-in-out p-4" onClick={onSelect}>
            <h3 className="text-lg font-bold mb-2">
                {deliveryBoy.fullName}
            </h3>
            <p className="text-gray-700">
                {deliveryBoy.mobile_no}
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select
            </button>
        </div>
    );
};

export default DeliveryBoyCard;
