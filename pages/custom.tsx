"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "./components/Navbar/page"
import Footer from "./components/Footer/page"


const dressFields = [
  { name: "bust", label: "Bust" },
  { name: "waist", label: "Waist" },
  { name: "hips", label: "Hips" },
  { name: "length", label: "Length" },
  { name: "shoulderWidth", label: "Shoulder Width" },
]

export default function DressForm() {
  



  return (
    <div >
        <Navbar />

        
     <div className="grid md:grid-cols-2 gap-8">
        <div className="px-12 pt-8">
            <Image
            src="/images/product/cst.jpeg"
            alt="Dress Measurements"
            width={400}
            height={600}
            className="rounded-lg"
            />
        </div>
        
        <form  className="space-y-4">
      {dressFields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type="number"
            id={field.name}
            name={field.name}
            placeholder={`Enter ${field.label.toLowerCase()} in inches`}
            required
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      ))}
      <div>
        <h1>Add Image</h1>
        <input
              type="file"
              accept="image/*"
              className="mt-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
      </div>
      <Button type="submit">Submit Measurements</Button>
    </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

