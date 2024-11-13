import React from 'react';
import { NavLink } from "react-router-dom";

export default function SpecialDish({ className }) {
    return (
        <div className={className}>
            <div className="flex flex-col md:flex-row justify-between items-center py-16">
                <div className="flex-1">

                    <div className="mb-5">
                        <span className="text-primary py-2 px-3 bg-light-yellow rounded-3xl">More Than Faster</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl text-gray-800 font-semibold mb-4">
                        Special Dish of <span className='special-font text-primary italic'>Lunch</span> <br/>
                        with <span className='special-font text-primary italic'>Healthy Ingredients</span> </h1>
                    
                    <p className="text-sm md:text-lg text-gray-600 mb-6">Serving North-Indian, South-Indian and desi-Chinese cuisines, choose from Vegetarian and Non-Vegetarian meal options.</p>
                    
                    <div className="flex gap-4 mb-6">
                    <NavLink to="/menu" className="btn-order md:text-white">
                        Check today's menus
                    </NavLink>
                    </div>
                    
                </div>
                <div className="flex-1 text-center items-center">
                    <img src="/image1.png" alt="Special Tiffin" className="inline-block md:h-96" />
                </div>
            </div>
        </div>
    );
}
