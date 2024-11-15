import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons from lucide-react
import UnderlineIcon from '../assets/images/underline.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Adjusted menuClass to control visibility and interaction
  const menuClass = isOpen ? "fixed inset-0 bg-black z-40 bg-opacity-85" : "hidden";

  return (
    <header className="bg-white py-4 drop-shadow font-sans">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold">
          <img onClick={() => navigate("/")} role="button" src="/DailyDoseLogo.png" className="h-12" alt="Daily Dose Logo" />
        </h1>
        <button
          className="text-gray-500 md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
          style={{ position: 'relative' }} // Ensures button is on top
        >
          {isOpen ? <X size={24} color="white" /> : <Menu size={24} className="text-primary" />}
        </button>
        <nav className={`${menuClass} md:flex md:items-center md:space-x-6 md:bg-transparent`}>
          <ul
            style={{'--underline-img-url': `url(${UnderlineIcon})`}}
            className={`md:flex md:flex-row md:space-x-6 md:items-center text-white md:text-gray-400 font-medium text-lg p-10 md:p-0 space-y-4 md:space-y-0`}
          >
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "underline-img text-primary font-semibold" : "text-white md:text-gray-400"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive ? "underline-img text-primary font-semibold" : "text-white md:text-gray-400"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  isActive ? "underline-img text-primary font-semibold" : "text-white md:text-gray-400"
                }
              >
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "underline-img text-primary font-semibold" : "text-white md:text-gray-400"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="flex">
              <NavLink to="/menu" className="btn-order md:text-white leading-6">
                Order Now
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
