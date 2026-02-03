import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, Package, ShoppingBag, CreditCard, BarChart3, Settings, LogOut, Menu, Bell, ChevronDown } from 'lucide-react';

interface SellerLayoutProps {
  children: React.ReactNode;
}


export default function SellerLayout({ children }: SellerLayoutProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Protect the layout client-side as well
  useEffect(() => {
    if (loading) return;
    
    if (!session) {
      router.push('/seller/login');
      return;
    }

    // @ts-ignore
    const role = session.user?.role as string;
    if (role !== 'SELLER' && role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Get shop name from session
  // @ts-ignore
  const shopName = (session?.user?.shopName as string) || session?.user?.name || "My Shop";
  
  // Generate initials from shop name
  const initials = shopName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
    


  const navigation = [
    { name: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/seller/products', icon: Package },
    { name: 'Orders', href: '/seller/orders', icon: ShoppingBag },
    { name: 'Payments', href: '/seller/payments', icon: CreditCard },
    { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/seller/settings', icon: Settings },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/seller/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <span className="text-xl font-bold tracking-tight">Waka<span className="text-yellow-600">Wears</span></span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
              const currentSlug = router.query.businessSlug as string;
              // If we don't have a slug yet (e.g. data loading), default to '#' or handle gracefully
              // But ideally we should have it. If not, maybe we are not in a slug route?
              // For now, let's assume we are or we can fall back to user metadata if needed, 
              // but the cleanest is assuming the URL has it if we are in [businessSlug] routes.
              
              // Note: The original links were /seller/..., now they should be /[businessSlug]/...
              // We need to replace '/seller' with `/${currentSlug}` if available.
              
              const href = currentSlug ? item.href.replace('/seller', `/${currentSlug}`) : '#';
              const isActive = router.asPath.startsWith(href);

              return (
                <Link
                  key={item.name}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-yellow-50 text-yellow-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-yellow-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile (Bottom) */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{shopName}</p>
                <p className="text-xs text-gray-500 truncate">Seller Account</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 flex items-center gap-3 px-2 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-gray-500 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-50 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                 <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-yellow-400 to-orange-500" />
                 </div>
                 <span className="hidden sm:block text-sm font-medium text-gray-700">{shopName}</span>
                 <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <Link href="/seller/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}