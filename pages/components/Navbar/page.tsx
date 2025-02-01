"use client"
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/custom", label: "Custom" },
    { href: "#", label: "Fashion" },
    { href: "#", label: "Beauty" },
    { href: "/art", label: "Art" },
    { href: "/discover", label: "Discover" },
  ];

  return (
    <nav className="bg-black text-white px-4 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <div className="flex flex-col items-start">
            <Image 
              src="/images/logo.png" 
              alt="WakaWears logo"
              height={200}
              width={100}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <h1 className="text-2xl font-light tracking-wider text-yellow-600 transition-colors duration-300 group-hover:text-white">
              WakaWears
            </h1>
            <p className="text-xs tracking-wide">Curated African Art</p>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-yellow-600 hover:text-white transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-yellow-600 transition-colors duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
          <button 
            className="md:hidden hover:text-yellow-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <button className="hover:text-yellow-600 transition-colors duration-300">
            <FaShoppingBag className="w-5 h-5" />
          </button>
          <button className="hover:text-yellow-600 transition-colors duration-300">
            <FaUser className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 py-4">
          <div className="flex flex-col space-y-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-yellow-600 hover:text-white transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;