"use client"
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import Link from 'next/link';

const Navbar = () => {
    
  return (
    <div>
        <nav className="bg-black text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/images/logo.png" 
            alt="logo"
            height={200}
            width={100}/>
            <h1 className="text-2xl font-light tracking-wider text-yellow-600">
              WakaWears
            </h1>
            <p className="text-xs tracking-wide">Curated African Art</p>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-yellow-600 hover:text-white">Home</Link>
            <Link href="#" className="text-yellow-600 hover:text-white">Custom</Link>
            <Link href="#" className="text-yellow-600 hover:text-white">Fashion</Link>
            <Link href="#" className="text-yellow-600 hover:text-white">Beauty</Link>
            <Link href="#" className="text-yellow-600 hover:text-white">Art</Link>
            <Link href="/discover" className="text-yellow-600 hover:text-white">Discover</Link>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black">
              
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FaSearch className="w-5 h-5" />
            <FiMenu className="w-5 h-5 md:hidden" />
            <FaShoppingBag className="w-5 h-5" />
            <FaUser className="w-5 h-5" />
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar