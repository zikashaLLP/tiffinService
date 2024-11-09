import React from 'react'
import { NavLink } from 'react-router-dom'  // Import NavLink

export default function Header() {
  return (
    <header className="bg-teal-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">FoodApp</h1>
          <nav className="space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-white underline" : "text-white"
              } // Apply underline styling if the link is active
              end // Ensures it matches the exact route '/'
            >
              Home
            </NavLink>
            <NavLink 
              to="/my-orders" 
              className={({ isActive }) => 
                isActive ? "text-white underline" : "text-white"
              } // Apply underline styling if the link is active
            >
              My Orders
            </NavLink>
            <NavLink 
              to="/contact" // Assuming you have a route for contact
              className={({ isActive }) => 
                isActive ? "text-white underline" : "text-white"
              } // Apply underline styling if the link is active
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </header>
  )
}
