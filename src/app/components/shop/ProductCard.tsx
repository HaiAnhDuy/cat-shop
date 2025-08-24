"use client";

import { useCart } from "@/app/contexts/CartContext";
import toast from "react-hot-toast";

import { Product } from "@/data/product";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: number) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group w-[306px] bg-white rounded-[20px] border border-gray-50 overflow-hidden hover:shadow-lg transition-shadow duration-200 relative">
      <div className="w-[306px] h-[306px] bg-gray-50 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={192}
                height={192}
                className="object-cover w-48 h-48 rounded-full"
                priority={true}
              />
            ) : (
              <span className="text-4xl">🐾</span>
            )}
          </div>
        </div>
        <button
          className="absolute bottom-4 right-4 p-3 bg-orange-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex items-center justify-center cursor-pointer"
          style={{ pointerEvents: "auto" }}
          title="Add to cart"
          onClick={() => {
            const inv =
              typeof product.inventory === "number" ? product.inventory : 0;
            if (inv > 0) {
              addToCart(product);
              if (typeof product.inventory === "number") product.inventory -= 1;
              toast.success("Đã thêm vào giỏ hàng");
            } else {
              toast.error("Sản phẩm đã hết hàng");
            }
          }}
        >
          <ShoppingCart size={22} />
        </button>
      </div>

      <div className="p-5 flex items-start justify-between cursor-pointer">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-black mb-3 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-base text-black">${product.price.toFixed(2)}</p>
          <p className="text-[12px] text-black">Kho: {product.inventory}</p>
        </div>
      </div>
    </div>
  );
}
