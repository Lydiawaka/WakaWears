import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SellPage() {
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading";
  const user = session?.user;
  const router = useRouter();
  
  // Form states
  const [shopName, setShopName] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // ... handlers ...

  // Logged in but no shop
  // @ts-ignore
  const hasShop = !!user?.shopName;

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: shopName, description: shopDesc }),
      });
      
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create shop");
      }
      
      // Force reload session to get new shop data
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
      router.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: productTitle,
          price: parseFloat(productPrice),
          category: productCategory,
          description: productDesc,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create product");
      }

      alert("Product created successfully!");
      setProductTitle("");
      setProductPrice("");
      setProductCategory("");
      setProductDesc("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoaded && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
        <Head>
            <title>Sell on WakaWears</title>
        </Head>
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Partner with WakaWears
          </h1>
          <p className="text-zinc-400 text-lg">
            Join thousands of sellers and reach millions of customers globally.
          </p>
          <button
            onClick={() => router.push('/seller/login')}
            className="w-full py-4 px-6 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-transform transform hover:scale-[1.02]"
          >
            Start Selling Today
          </button>
        </div>
      </div>
    );
  }

  // Logged in but no shop


  if (!hasShop) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
         <Head>
            <title>Create Your Shop</title>
        </Head>
        <div className="max-w-lg w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
          <h2 className="text-3xl font-bold mb-2">Create Your Shop</h2>
          <p className="text-zinc-400 mb-6">Enter your shop details to get started.</p>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleCreateShop} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Shop Name</label>
              <input 
                type="text" 
                required 
                value={shopName}
                onChange={e => setShopName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="My Awesome Brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
              <textarea 
                value={shopDesc}
                onChange={e => setShopDesc(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                placeholder="We sell the best vintage clothes..."
              />
            </div>
            <button
               disabled={isLoading}
               className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Launch Shop"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Seller Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Head>
        <title>Seller Dashboard</title>
      </Head>
      <nav className="border-b border-zinc-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Seller Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm">Logged in as {user?.email}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar / Stats (Placeholder) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
             <h3 className="text-zinc-400 font-medium mb-2">Shop Status</h3>
             <div className="text-2xl font-bold flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Active
             </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
             <h3 className="text-zinc-400 font-medium mb-4">Quick Actions</h3>
             <ul className="space-y-2 text-sm text-zinc-300">
               <li className="p-2 hover:bg-zinc-800 rounded cursor-pointer">View My Shop</li>
               <li className="p-2 hover:bg-zinc-800 rounded cursor-pointer">Orders</li>
               <li className="p-2 hover:bg-zinc-800 rounded cursor-pointer">Settings</li>
             </ul>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="md:col-span-2">
            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                <form onSubmit={handleCreateProduct} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Product Title</label>
                            <input 
                                type="text"
                                required
                                value={productTitle}
                                onChange={e => setProductTitle(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Price</label>
                            <input 
                                type="number"
                                required
                                min="0"
                                step="any"
                                value={productPrice}
                                onChange={e => setProductPrice(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            />
                         </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                        <select 
                            value={productCategory}
                            onChange={e => setProductCategory(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Category</option>
                            <option value="clothing">Clothing</option>
                            <option value="accessories">Accessories</option>
                            <option value="decor">Home Decor</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                        <textarea 
                            value={productDesc}
                            onChange={e => setProductDesc(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                        />
                     </div>
                     <button
                        disabled={isLoading}
                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                     >
                        {isLoading ? "Adding Product..." : "Add Product"}
                     </button>
                </form>
            </div>
        </div>
      </main>
    </div>
  );
}
