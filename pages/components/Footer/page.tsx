import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaCopyright } from "react-icons/fa";


const Footer = () => {
  return (
    <div>  
        <footer className="py-8 px-4 md:px-8 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contact Us Section */}
            <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase">Contact Us</h3>
            <div className="space-y-2">
                <p className="text-sm">
                Support Phone Number: <br />
                <a href="tel:+254 778 136 430" className="hover:underline">
                    +254 778 136 430
                </a>
                </p>
                <div>
                <p className="text-sm">General Enquiries / Complaints:</p>
                <a 
                    href="mailto:digital@thelotteaccra.com" 
                    className="text-sm hover:underline"
                >
                    digital@waka_wears.com
                </a>
                </div>
                <p className="text-sm">
                Instagram:{' '}
                <a 
                    href="https://instagram.com/waka_wears" 
                    className="hover:underline"
                >
                    @wakawears
                </a>
                </p>
            </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold uppercase">Join #WAKAWEARSTRIBE</h3>
            <p className="text-sm">Subscribe to get special offers, giveaways, and exclusive deals.</p>
            
            <div className="flex items-center max-w-md">
                <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border-b border-black focus:outline-none text-sm"
                />
                <button className="ml-2">
                <CiMail className="w-5 h-5" />
                </button>
            </div>

            <div className="flex space-x-4 mt-4">
                <a href="https://instagram.com/waka_wears">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                </a>
                <a href="https://facebook.com">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                </a>
            </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
            <nav className="flex flex-col space-y-2">
                <Link href="/search" className="text-sm hover:underline">
                Search
                </Link>
                <Link href="/faqs" className="text-sm hover:underline">
                FAQs
                </Link>
                <Link href="/shipping" className="text-sm hover:underline">
                Shipping
                </Link>
                <Link href="/about" className="text-sm hover:underline">
                About Us
                </Link>
                <Link href="/news" className="text-sm hover:underline">
                News
                </Link>
                <Link href="/returns" className="text-sm hover:underline">
                Returns & Refunds
                </Link>
            </nav>
            </div>
        </div>
        <div className="flex justify-center items-center mt-4">
            <FaCopyright />
            <h1 className="text-gray-600">2025</h1>
        </div>
        </footer>
        
    </div>
  )
}
export default Footer