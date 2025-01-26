import React from 'react';
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const discover = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <Card className="w-full">
      <CardHeader>
        <CardTitle className=" flex items-center justify-center ">WakaWears</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/self.jpg"
              alt="Waka Wears"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
            <p>
            Founded in 2023 by Kenyan designer Lydia Waka, WakaWear is a clothing brand deeply inspired by arts, global cultures, and the natural beauty of Africa. Rooted in creativity and cultural pride, WakaWear showcases designs that combine bold colors, modern aesthetics, and elements that celebrate Kenya&apos;s rich heritage.
            </p>
            <p>
            Lydia Waka, born in 2002 and passionate about design and the arts, cultivated her skills in fashion and tailoring from a young age. Her vision for WakaWears was clear: to create an African-owned fashion brand that speaks to adventurers in spirit, style, and substance. By embracing innovative designs, retro-classic silhouettes, and contemporary femininity, WakaWears appeals to individuals who value authenticity and bold expression.
            </p>
            <p>
            Waka&apos;s commitment to both her craft and art fuels her determination to elevate WakaWears to the global stage. Inspired by nature, joy, and the spirit of adventure, WakaWears serves as a testament to Waka&apos;s mission of creating timeless, accessible clothing that proudly represents Africa&apos;s vibrant fashion industry.

            </p>
          </div>
        </div>
      </CardContent>
    </Card>
      </div>
      <Footer />

    </div>
  )
}

export default discover
