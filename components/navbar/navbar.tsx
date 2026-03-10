"use client";
import Image from "next/image";
import profile from "../../photos/1.jpg";
import Link from "next/link";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../p-card/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky w-full top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={profile}
                alt="profile"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-semibold text-gray-800">Brand</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/product"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/student"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Students
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link href="/cart">
              <RiShoppingCartLine className="h-5 w-5 text-gray-600" />
            </Link>

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
