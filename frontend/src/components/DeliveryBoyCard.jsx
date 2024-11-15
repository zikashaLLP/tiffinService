import React from 'react';

const DeliveryBoyCard = ({ deliveryBoy, onSelect }) => {
    return (
        <div className="card bg-white hover:bg-green-50 cursor-pointer border hover:shadow-md rounded-lg overflow-hidden transition duration-150 ease-in-out p-4" onClick={onSelect}>
            <h3 className="font-bold mb-1">
                {deliveryBoy.fullName}
            </h3>
            <p className="text-gray-700">
                {deliveryBoy.mobile_no}
            </p>
            <button className="mt-4 bg-primary bg-opacity-80 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded">
                Select
            </button>
        </div>
    );
};

export default DeliveryBoyCard;
