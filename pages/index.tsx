import Header from "./components/header/page"
import HeroSection from "./components/hero-section/page"
import FeaturedCollections from "./components/featured-collections/page"
import SearchFilter from "./components/search-filter/page"
import ProductShowcase from "./components/product-showcase/page"
import TopVendors from "./components/top-vendors/page"
import CategoryShowcase from "./components/category-showcase/page"
import CallToAction from "./components/call-to-action/page"
import Footer from "./components/Footer/page"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCollections />
      <SearchFilter />
      <CategoryShowcase />
      <ProductShowcase />
      <TopVendors />
      <CallToAction />
      <Footer />
    </div>
  )
}
