export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  isPopular?: boolean;
  inventory?: number;
}

export interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

export interface Brand {
  name: string;
  count: number;
  checked?: boolean;
}

export const categories: Category[] = [
  { name: "Mèo lông ngắn", count: 21 },
  { name: "Mèo lông dài", count: 28 },
  { name: "Mèo Tây", count: 12 },
  { name: "Mèo Ta", count: 80 },
  { name: "Mèo không lông", count: 90 },
  { name: "Mèo lai", count: 24 },
];

export const brands: Brand[] = [
  { name: "MeoMeo House", count: 28 },
  { name: "CatViet", count: 18 },
  { name: "SenShop", count: 16 },
  { name: "Boss Luxury", count: 40 },
  { name: "Mimi Pet", count: 28 },
  { name: "HoangThuong Cat", count: 18 },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Mèo Anh Lông Ngắn",
    price: 29.99,
    image: "/cat-1.jpg",
    category: "Mèo lông ngắn",
    brand: "MeoMeo House",
    isPopular: false,
    inventory: 10,
  },
  {
    id: 2,
    name: "Mèo Ba Tư",
    price: 20.99,
    image: "/cat-2.jpg",
    category: "Mèo lông dài",
    brand: "CatViet",
    isPopular: true,
    inventory: 20,
  },
  {
    id: 3,
    name: "Mèo Maine Coon",
    price: 19.99,
    image: "/cat-3.jpg",
    category: "Mèo lông dài",
    brand: "SenShop",
    isPopular: false,
    inventory: 5,
  },
  {
    id: 4,
    name: "Mèo Ragdoll",
    price: 220.0,
    image: "/cat-4.jpg",
    category: "Mèo Tây",
    brand: "Boss Luxury",
    isPopular: true,
    inventory: 8,
  },
  {
    id: 5,
    name: "Mèo Xiêm",
    price: 4.99,
    image: "/cat-5.jpg",
    category: "Mèo Tây",
    brand: "Mimi Pet",
    isPopular: false,
    inventory: 15,
  },
  {
    id: 6,
    name: "Mèo Tai Cụp",
    price: 49.99,
    image: "/cat-6.jpeg",
    category: "Mèo lông ngắn",
    brand: "HoangThuong Cat",
    isPopular: true,
    inventory: 12,
  },
  {
    id: 7,
    name: "Mèo Bengal",
    price: 9.99,
    image: "/cat-7.jpg",
    category: "Mèo lai",
    brand: "MeoMeo House",
    isPopular: true,
    inventory: 10,
  },
  {
    id: 8,
    name: "Mèo Nga Xanh",
    price: 49.99,
    image: "/cat-8.jpg",
    category: "Mèo lông ngắn",
    brand: "CatViet",
    isPopular: false,
    inventory: 8,
  },
  {
    id: 9,
    name: "Mèo Abyssinian",
    price: 99.0,
    image: "/cat-9.jpg",
    category: "Mèo Ta",
    brand: "SenShop",
    isPopular: true,
    inventory: 6,
  },
  {
    id: 10,
    name: "Mèo Birman",
    price: 19.99,
    image: "/cat-10.jpg",
    category: "Mèo Tây",
    brand: "Boss Luxury",
    isPopular: false,
    inventory: 4,
  },
  {
    id: 11,
    name: "Mèo Không Lông",
    price: 24.99,
    image: "/cat-11.jpg",
    category: "Mèo không lông",
    brand: "Mimi Pet",
    isPopular: false,
    inventory: 4,
  },
  {
    id: 12,
    name: "Mèo Mỹ Lông Ngắn",
    price: 50.0,
    image: "/cat-12.jpg",
    category: "Mèo lông ngắn",
    brand: "HoangThuong Cat",
    isPopular: true,
    inventory: 4,
  },
];

export const popularProducts = products.filter((product) => product.isPopular);
