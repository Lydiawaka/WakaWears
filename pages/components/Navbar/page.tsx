// src/components/Navbar/Navbar.tsx
"use client"
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import { useCart } from '../../context/CartContext';

// Define interface for search results
interface SearchResult {
  id: number;
  title: string;
  // Add other properties as needed
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  // Use the cart context
  const { cartItems, isCartOpen, setIsCartOpen, getTotalItems } = useCart();
  
  // Example search function - replace with your actual search logic
  const handleSearch = async (query: string) => {
    console.log(`Searching for: ${query}`);
    
    // Example: API call to search endpoint
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results);
      
      // Optionally navigate to search results page
      // router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

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
            {/* Removed the wrapping button */}
            <div className="hover:text-yellow-600 transition-colors duration-300">
              <SearchBar onSearch={handleSearch} placeholder="Search site..." />
            </div>
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
            <button 
              className="relative hover:text-yellow-600 transition-colors duration-300"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
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