"use client";

import { useState, useRef } from "react";
import { categories, brands } from "@/data/product";

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({ min: 9, max: 100 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange?.({
      categories: updated,
      brands: selectedBrands,
      tags: selectedTags,
      priceRange,
    });
  };

  const handleBrandChange = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    onFilterChange?.({
      categories: selectedCategories,
      brands: updated,
      tags: selectedTags,
      priceRange,
    });
  };

  return (
    <div className="w-[306px] space-y-7">
      <div className="space-y-4">
        <div className="p-3">
          <h3 className="text-xl font-semibold text-black">
            Filter by categories
          </h3>
        </div>
        <div className="pl-3 space-y-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`cat-${category.name}`}
                  className="w-4 h-4 border border-gray-400 rounded"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <label
                  htmlFor={`cat-${category.name}`}
                  className="text-base font-medium text-black"
                >
                  {category.name}
                </label>
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-xl">
                <span className="text-sm text-orange-500">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-xl font-semibold text-black">Filter by Price</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">${priceRange.min}</span>
            <input
              type="range"
              min={priceRange.min}
              max={100}
              value={priceRange.max}
              onChange={(e) => {
                const max = Number(e.target.value);
                setPriceRange((r) => ({ ...r, max }));
              }}
              onMouseUp={(e) => {
                const max = Number((e.target as HTMLInputElement).value);
                onFilterChange?.({
                  categories: selectedCategories,
                  brands: selectedBrands,
                  tags: selectedTags,
                  priceRange: { ...priceRange, max },
                });
              }}
              className="w-full accent-orange-500"
            />
            <span className="text-sm text-gray-500">${priceRange.max}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-black">
              Giá: ${priceRange.min} - ${priceRange.max}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3">
          <h3 className="text-xl font-semibold text-black">Filter by brands</h3>
        </div>
        <div className="pl-3 space-y-2">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand.name}`}
                  className="w-4 h-4 border border-gray-400 rounded"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <label
                  htmlFor={`brand-${brand.name}`}
                  className="text-base font-medium text-black"
                >
                  {brand.name}
                </label>
              </div>
              <div className="bg-gray-50 px-2 py-1 rounded-xl">
                <span className="text-sm text-orange-500">{brand.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
