
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'

const ImageList = [
    {
      id: 1,
      img: "/images/Hero/sales.png",
      title: "Upto 50% off on Men's Wear",
      description: "Revamp your wardrobe with our exclusive sale on a wide selection of stylish shirts, comfortable trousers, trendy jackets, and more.  Don't miss out on this opportunity to elevate your style at unbeatable prices. Shop now and step out in confidence!",
    },
    {
      id: 2,
      img: "/images/Hero/genni.png",
      title: "Upto 30% off on women's Wear",
      description: "Upgrade your wardrobe with our fabulous collection of womens wear, now at up to 30% off! From chic dresses to cozy tops and stylish accessories, find the perfect pieces to express your unique style. Dont wait—refresh your look today and enjoy these amazing savings!",
    },
    {
      id: 3,
      img: "/images/Hero/shopping.jpg",
      title: "Upto 70% off on All Products",
      description: "Shop our incredible Mega Sale and enjoy up to 70% off on all products! Whether you're looking for fashion, accessories, or essentials, now is the perfect time to grab amazing deals. Dont miss out on this limited-time offer—refresh your collection and save big today!",
    },
  ];
  

const Hero = () => {

    const setting = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
  };

  return (
    <div>

<div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      {/* background pattern */}
      <div className="h-[500px] w-[500px] bg-yellow-500 absolute -top1/2 right-0 rounded-3xl rotate-45 -z-9">
      </div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0"> 
        <Slider {...setting}>
         {ImageList.map((data) => 
          <div key={data.id}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* text content section */}
              <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  {data.title}
                </h1>
                <p className="text-sm">{data.description}</p>
                <div>
                  <button className="bg-gradient-to-r from-primary to-secondary bg-black hover:scale-105 duration-200 text-yellow-600 py-2 px-4 rounded-full">
                    Order Now
                  </button>
                </div>
              </div>
              {/* image section */}
              <div>
                <div>
                  <Image src={data.img} alt="sales"
                  width={500}
                  height={300}
                  className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto" />
                </div>
              </div>

            </div>
          </div>
        )}
        </Slider>
      </div>
    </div>

    </div>
  )
}
export default Hero;