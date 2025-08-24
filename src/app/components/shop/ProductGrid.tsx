"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Product } from "@/data/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sort: string) => void;
}

export default function ProductGrid({
  products,
  currentPage = 1,
}: ProductGridProps) {
  const startItem = (currentPage - 1) * 12 + 1;
  const endItem = Math.min(currentPage * 12, products.length);
  const totalItems = products.length;

  return (
    <div className="flex flex-col gap-[60px]">
      <div className="flex items-center justify-between w-[966px]">
        <p className="text-xl font-medium text-gray-600">
          Showing {startItem}-{endItem} of {totalItems} results
        </p>
      </div>

      <div className="w-[966px] grid grid-cols-3 gap-6">
        {products.slice(0, 12).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={(id) => console.log("Wishlisted product:", id)}
          />
        ))}
      </div>
    </div>
  );
}
