import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo192.png" 
              alt="Minecraft Wiki Toolkit" 
              className="h-8 w-8" 
            />
            <span className="minecraft-font text-xl font-bold">Minecraft Wiki Toolkit</span>
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/wiki">Wiki</NavLink>
            <NavLink to="/blueprints">Blueprints</NavLink>
            <NavLink to="/calculators">Calculateurs</NavLink>
            <NavLink to="/login">Connexion</NavLink>
          </div>
          
          {/* Menu Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/wiki" onClick={() => setIsOpen(false)}>Wiki</MobileNavLink>
              <MobileNavLink to="/blueprints" onClick={() => setIsOpen(false)}>Blueprints</MobileNavLink>
              <MobileNavLink to="/calculators" onClick={() => setIsOpen(false)}>Calculateurs</MobileNavLink>
              <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>Connexion</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// NavLink component for desktop menu
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="hover:text-green-200 transition-colors duration-200"
  >
    {children}
  </Link>
);

// NavLink component for mobile menu
const MobileNavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    className="block py-2 hover:bg-green-700 px-4 rounded transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
