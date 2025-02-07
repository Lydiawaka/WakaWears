"use client"
import Footer from "./components/Footer/page";
import Products from "./components/Products/page";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Navbar from "./components/Navbar/page";



const Index = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  


  return (
    <div>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      
      <div className="relative h-[600px] bg-black">
        <div className="absolute inset-0 bg-[url('/images/product/sho.jpeg')] bg-cover bg-center opacity-80"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl font-light italic mb-4">NEW ARRIVALS</h1>
          <button className="px-8 py-2 border border-yellow-600 rounded-xl hover:bg-yellow-600 hover:text-black transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>

      <Products />

      <Footer />
    </div>
  )
}
export default Index