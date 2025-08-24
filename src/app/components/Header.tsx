"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Search, Heart, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      setUser(session?.user);
    }
  }, [session]);

  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/auth/login" });
    if (res?.url) {
      window.location.href = "/auth/login";
    }
  };

  return (
    <header className="bg-white shadow-sm rounded-[40px] mx-4 mt-4 px-10 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-6 bg-orange-500 rounded flex items-center justify-center">
          <span className="text-white text-sm">🐾</span>
        </div>
        <h1 className="text-xl font-bold text-black">Pet Shop</h1>
      </div>

      <nav className="hidden lg:flex items-center gap-6">
        <Link href="/" className="relative">
          <span
            className={`text-lg px-2.5 py-1 font-medium ${
              pathname === "/"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-black hover:text-orange-500 transition-colors"
            }`}
          >
            Home
          </span>
        </Link>
        <Link
          href="/shop"
          className={`text-lg px-2.5 py-1 font-medium ${
            pathname === "/shop"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-black hover:text-orange-500 transition-colors"
          }`}
        >
          Shop
        </Link>
      </nav>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer hover:text-orange-500 transition-colors">
            <Link href="/cart">
              <ShoppingCart size={24} className="text-gray-700" />
              {/* số giỏ hàng */}
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {totalItems ? (totalItems < 10 ? totalItems : "9+") : "0"}
              </div>
            </Link>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-full transition-colors"
                title="Đăng xuất"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium hidden sm:block">
                  Đăng xuất
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full transition-colors text-sm font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden">
        <button className="text-gray-700 hover:text-orange-500 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
