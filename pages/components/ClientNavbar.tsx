"use client"
import dynamic from 'next/dynamic';

// Dynamically import the Navbar with no SSR
const Navbar = dynamic(() => import('../components/Navbar/page'), { ssr: false });

const ClientNavbar = () => {
  return <Navbar />;
};

export default ClientNavbar;