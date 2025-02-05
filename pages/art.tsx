import React from 'react';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';



const ArtPage: React.FC = () => {
  return (
    <div>
        <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Art Collection</h1>
      
        <div className="container mx-auto px-4 py-8 ">
          <div className='font-bold text-center mb-8'>
            <h1 className='text-yellow-500'>COMING SOON</h1>
            <p className='text-gray-900' >Stay Tuned</p>
            <p className='text-yellow-400'>Love You</p>
          </div>    
        </div>  
    </div>
    <div>
      <Footer />
    </div>
    </div>
  );
};

export default ArtPage;