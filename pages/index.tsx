import { GetServerSideProps } from "next"
import { prisma } from "../lib/prisma"
import Header from "../components/header/page"
import HeroSection from "../components/hero-section/page"
import ProductShowcase from "../components/product-showcase/page"
import TopVendors from "../components/top-vendors/page"
import Footer from "@/components/Footer/page"
import ProductsContent from "../components/products/ProductsContent"

interface Shop {
  id: string
  name: string
  logoUrl: string | null
  _count: {
    products: number
  }
}

interface HomeProps {
  topVendors: Shop[]
}

export default function Home({ topVendors }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductsContent withHero={false} />
      <ProductShowcase />
      <TopVendors vendors={topVendors} />
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const shops = await prisma.shop.findMany({
      take: 4,
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        createdAt: 'desc' // or orders count if available
      }
    })

    return {
      props: {
        topVendors: JSON.parse(JSON.stringify(shops))
      }
    }
  } catch (error) {
    console.error("Error fetching top vendors:", error)
    return {
      props: {
        topVendors: []
      }
    }
  }
}
