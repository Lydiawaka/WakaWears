import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import Navbar from "./components/Navbar/page"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "wakawears",
  description: "Discover our range of fashion and beauty products",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">     
      <body className={`${inter.className} bg-gray-100`}>
        <Navbar />
        {children}</body>
    </html>
  )
}

