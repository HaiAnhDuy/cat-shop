"use client";
import { useState } from "react";
import { useCart } from "@/app/contexts/CartContext";
import Image from "next/image";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, updateQuantity, clearCart } = useCart() as any;
  const cartItems: any = cart;
  const [status, setStatus] = useState<any>(false);
  const total = cartItems.reduce(
    (sum: any, item: any) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  // const handleQuantityChange = (id: number, delta: number) => {
  //   setCart((prev: any) => {
  //     return prev
  //       .map((item: any) =>
  //         item.id === id
  //           ? { ...item, quantity: (item.quantity ?? 1) + delta }
  //           : item
  //       )
  //       .filter((item: any) => (item.quantity ?? 1) > 0);
  //   });
  // };

  const handleLoading = () => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
      clearCart();
      toast.success("Thanh toán thành công!");
    }, 3000);
  };
  if (status) {
    return <Loading />;
  }
  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        Giỏ hàng của bạn
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-gray-400 text-xl text-center py-16">
          Chưa có sản phẩm nào trong giỏ hàng.
        </div>
      ) : (
        <div>
          <div className="divide-y divide-gray-100">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex items-center gap-6 py-6">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover w-20 h-20"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-xl text-3xl">
                    🐾
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-lg font-semibold text-black mb-1">
                    {item.name}
                  </div>
                  <div className="text-gray-500 text-sm flex items-center gap-2 select-none">
                    Số lượng:
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-200 text-lg font-bold text-orange-500 transition-colors"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Giảm số lượng"
                      type="button"
                    >
                      -
                    </button>
                    <span className="font-medium text-black w-6 text-center">
                      {item.quantity ?? 1}
                    </span>
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-200 text-lg font-bold text-orange-500 transition-colors"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Tăng số lượng"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-lg font-bold text-orange-500">
                  ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <div className="bg-orange-100 rounded-xl px-8 py-4 text-xl font-bold text-orange-600 shadow">
              Tổng cộng: <span className="ml-2">${total.toFixed(2)}</span>
            </div>
            <div
              className="bg-green-100 rounded-xl px-8 py-4 text-xl font-bold text-green-600 shadow cursor-pointer"
              onClick={handleLoading}
            >
              Thanh toán
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
