"use client"

import { useState } from "react"
import { ShoppingBag, Menu, X, Heart, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { useCurrency } from "@/context/CurrencyContext"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { currency, setCurrency, availableCurrencies } = useCurrency()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="WakaWears Logo"
                width={32}
                height={32} 
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-light tracking-wider text-gray-900 transition-colors duration-300 group-hover:text-yellow-700">
                WakaWears
              </h1>
              <p className="text-xs tracking-wide text-gray-600">Curated African Art</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Clothing Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("clothing")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors text-sm">
                Clothing <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "clothing" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/marketplace?category=Clothing&gender=Men" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Men&apos;s Clothing
                  </Link>
                  <Link href="/marketplace?category=Clothing&gender=Women" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Women&apos;s Clothing
                  </Link>
                  <Link href="/marketplace?category=Clothing&gender=Kids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Kids & Babies
                  </Link>
                  <Link href="/marketplace?category=Clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    View All
                  </Link>
                </div>
              )}
            </div>

            {/* Accessories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("accessories")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors text-sm">
                Accessories <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "accessories" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/marketplace?category=Accessories&type=Jewelry" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Jewelry
                  </Link>
                  <Link href="/marketplace?category=Accessories&type=Bags" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Bags & Purses
                  </Link>
                  <Link href="/marketplace?category=Accessories&type=Headwear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Headwear
                  </Link>
                  <Link href="/marketplace?category=Accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    View All
                  </Link>
                </div>
              )}
            </div>

            {/* Home & Living Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("home")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors text-sm">
                Home & Living <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "home" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/marketplace?category=Home&type=Decor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Home Decor
                  </Link>
                  <Link href="/marketplace?category=Home&type=Textiles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Textiles
                  </Link>
                  <Link href="/marketplace?category=Home&type=Art" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Wall Art
                  </Link>
                  <Link href="/marketplace?category=Home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    View All
                  </Link>
                </div>
              )}
            </div>

            <Link href="/sell-with-us" className="text-gray-700 hover:text-yellow-600 transition-colors text-sm">
              Sell with us
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors text-sm">
                About <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === "about" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    About Us
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Contact
                  </Link>
                  <Link href="/discover" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600">
                    Discover
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative group z-50">
               <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black">
                 {currency.code} <ChevronDown className="w-3 h-3" />
               </button>
               <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg py-1 hidden group-hover:block">
                 {availableCurrencies.map((code) => (
                   <button
                     key={code}
                     onClick={() => setCurrency(code)}
                     className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${currency.code === code ? 'font-bold text-yellow-600' : 'text-gray-700'}`}
                   >
                     {code}
                   </button>
                 ))}
               </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-3 pt-4 border-t border-gray-200">
            <details className="group">
              <summary className="flex items-center justify-between text-gray-700 hover:text-yellow-600 transition-colors py-2 cursor-pointer list-none">
                Clothing <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/marketplace?category=Clothing&gender=Men" className="block text-gray-600 hover:text-yellow-600 py-1">Men&apos;s Clothing</Link>
                <Link href="/marketplace?category=Clothing&gender=Women" className="block text-gray-600 hover:text-yellow-600 py-1">Women&apos;s Clothing</Link>
                <Link href="/marketplace?category=Clothing&gender=Kids" className="block text-gray-600 hover:text-yellow-600 py-1">Kids & Babies</Link>
                <Link href="/marketplace?category=Clothing" className="block text-gray-600 hover:text-yellow-600 py-1">View All</Link>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between text-gray-700 hover:text-yellow-600 py-2 cursor-pointer list-none">
                Accessories <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/marketplace?category=Accessories&type=Jewelry" className="block text-gray-600 hover:text-yellow-600 py-1">Jewelry</Link>
                <Link href="/marketplace?category=Accessories&type=Bags" className="block text-gray-600 hover:text-yellow-600 py-1">Bags & Purses</Link>
                <Link href="/marketplace?category=Accessories&type=Headwear" className="block text-gray-600 hover:text-yellow-600 py-1">Headwear</Link>
                <Link href="/marketplace?category=Accessories" className="block text-gray-600 hover:text-yellow-600 py-1">View All</Link>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between text-gray-700 hover:text-yellow-600 py-2 cursor-pointer list-none">
                Home & Living <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/marketplace?category=Home&type=Decor" className="block text-gray-600 hover:text-yellow-600 py-1">Home Decor</Link>
                <Link href="/marketplace?category=Home&type=Textiles" className="block text-gray-600 hover:text-yellow-600 py-1">Textiles</Link>
                <Link href="/marketplace?category=Home&type=Art" className="block text-gray-600 hover:text-yellow-600 py-1">Wall Art</Link>
                <Link href="/marketplace?category=Home" className="block text-gray-600 hover:text-yellow-600 py-1">View All</Link>
              </div>
            </details>

            <Link href="/sell-with-us" className="text-gray-700 hover:text-yellow-600 py-2">
              Sell with us
            </Link>
            <details className="group">
              <summary className="flex items-center justify-between text-gray-700 hover:text-yellow-600 py-2 cursor-pointer list-none">
                About <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/about" className="block text-gray-600 hover:text-yellow-600 py-1">About Us</Link>
                <Link href="/contact" className="block text-gray-600 hover:text-yellow-600 py-1">Contact</Link>
                <Link href="/discover" className="block text-gray-600 hover:text-yellow-600 py-1">Discover</Link>
              </div>
            </details>
            <Link href="/help" className="text-gray-700 hover:text-yellow-600 py-2">
              Help
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
