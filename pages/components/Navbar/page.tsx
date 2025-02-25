"use client"
import { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/custom", label: "Custom" },
    { href: "/fashion", label: "Fashion" },
    { href: "/beauty", label: "Beauty" },
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
              className="transition-transform duration-300 group-hover:scale-105" />
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

        <div className="relative">
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="hover:text-yellow-600 transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden hover:text-yellow-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <button className="hover:text-yellow-600 transition-colors duration-300">
              <FaShoppingCart className="w-5 h-5" />
            </button>
            <button className="hover:text-yellow-600 transition-colors duration-300">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu - Updated Style */}
        <div className={`
          md:hidden
          absolute
          top-full
          left-0
          right-0
          bg-black
          border-t
          border-gray-800
          transition-all
          duration-300
          ease-in-out
          z-50
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible h-0'}
        `}>
          <div className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-yellow-600 hover:text-white transition-colors duration-200 flex justify-between items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span className="text-white">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;