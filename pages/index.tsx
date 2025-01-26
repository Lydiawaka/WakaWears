"use client"
import Hero from "./components/Hero/page";
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

      <Hero />

      <Products />

      <Footer />
    </div>
  )
}
export default Index