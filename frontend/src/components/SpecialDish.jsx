import React from 'react';

export default function SpecialDish() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 px-16 py-8">
            <div className="flex-1">
                <h1 className=" text-3xl md:text-5xl text-gray-800 mb-4  md:w-2/3">Special Dish of <span className='special-font text-primary italic'>Lunch</span> with <span className='special-font text-primary italic'>Healthy Ingredients</span> </h1>
                <p className=" text-sm md:text-lg text-gray-600 mb-6">Serving North-Indian, South-Indian and desi-Chinese cuisines, choose from Vegetarian and Non-Vegetarian meal options.</p>
                <div className="flex gap-4 mb-6">
                    <button className="btn-order">
                        Get Started
                    </button>
                </div>
                
            </div>
            <div className="flex-1 text-center items-center">
                <img src="/image1.png" alt="Special Tiffin" className="inline-block md:h-96" />
            </div>
        </div>
    );
}
