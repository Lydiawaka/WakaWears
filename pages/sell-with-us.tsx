import Head from "next/head"
import Link from "next/link"
import Header from "@/components/header/page"
import Footer from "@/components/Footer/page"
import { ArrowRight, Store, UploadCloud, BarChart3, Wallet, CheckCircle2 } from "lucide-react"

export default function SellWithUs() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Head>
        <title>Sell on WakaWears | Turn Your Craft into a Global Brand</title>
        <meta name="description" content="Join WakaWears as a seller. Register your business and start selling African fashion, accessories, and art to a global audience." />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-900 text-white">
            {/* Abstract Background Element resembling African patterns - Simplified SVG or gradient */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L50 100 L100 0 Z" fill="#FBBF24" />
                    <path d="M0 100 L50 0 L100 100 Z" fill="#D97706" />
                 </svg>
            </div>
            
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Sell on <span className="text-yellow-500">WakaWears</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl font-light">
              Turn your craft into a global brand. Join the premier marketplace for African fashion, accessories, and lifestyle products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/seller/register"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Register Your Business
              </Link>
              <Link
                href="/seller/login"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-lg font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
              >
                Seller Login
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Clothing</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Jewelry & Accessories</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Home & Living</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Art & Textiles</span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Starting your journey with WakaWears is simple. We&apos;ve streamlined the process so you can focus on what you do best—creating.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Store,
                  title: "1. Register",
                  description: "Create your seller account with your business details and contact information."
                },
                {
                  icon: UploadCloud,
                  title: "2. Upload",
                  description: "List your unique products with high-quality images and descriptions."
                },
                {
                  icon: BarChart3,
                  title: "3. Manage",
                  description: "Track orders, manage inventory, and communicate with customers via your dashboard."
                },
                {
                  icon: Wallet,
                  title: "4. Get Paid",
                  description: "Receive secure payments directly to your account as you grow your business."
                }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Benefits Section */}
        <section className="py-20 bg-amber-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Sell With <span className="text-yellow-700">WakaWears</span>?
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  We are more than just a marketplace; we are a community dedicated to showcasing African creativity to the world. We provide the tools and support you need to succeed.
                </p>
                
                <div className="space-y-6">
                  {[
                    "Access a curated global marketplace passionate about African culture.",
                    "Powerful marketing support to feature your brand and stories.",
                    "Secure handling of payments and seamless checkout experiences.",
                    "Intuitive seller dashboard to manage your flourishing business."
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                      </div>
                      <p className="text-gray-800 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <Link href="/seller/register" className="text-yellow-700 font-semibold hover:text-yellow-800 flex items-center gap-2 group">
                    Learn more about our seller policies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Visual Cards representing the 'Vibe' */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform translate-y-8">
                    <div className="h-10 w-10 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                        <BarChart3 className="text-orange-600 w-6 h-6"/>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Growth focused</h4>
                     <p className="text-sm text-gray-500">Analytics and insights to help you understand your customers.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                        <Store className="text-yellow-600 w-6 h-6"/>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Your Brand First</h4>
                     <p className="text-sm text-gray-500">Customizable shop pages that let your unique identity shine.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform translate-y-8">
                     <div className="h-10 w-10 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                        <Wallet className="text-green-600 w-6 h-6"/>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Fair Fees</h4>
                     <p className="text-sm text-gray-500">Competitive commission rates that prioritize seller profitability.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 bg-gray-900 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-5 bg-[url('/african-pattern-overlay.png')] bg-repeat"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of creators sharing the spirit of Africa with the world.
            </p>
            <Link
              href="/seller/register"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full text-gray-900 bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
            >
              Start Selling Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
