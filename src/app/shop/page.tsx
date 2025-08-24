"use client";

import { useState, useMemo } from "react";
import FilterSidebar from "@/app/components/shop/FilterSidebar";
import ProductGrid from "@/app/components/shop/ProductGrid";
import { products, Product } from "@/data/product";

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    tags: [] as string[],
    priceRange: { min: 9, max: 399 },
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: unknown) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex gap-6 px-[72px] py-[60px]">
        <FilterSidebar onFilterChange={handleFilterChange} />

        <ProductGrid
          products={filteredProducts}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSortChange={(sort) => console.log("Sort changed:", sort)}
        />
      </div>
    </div>
  );
}
