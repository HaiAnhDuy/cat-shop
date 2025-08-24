"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/app/components/Loading";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/shop"); // đá về shop
    }
  }, [session, router]);
  if (status === "loading") {
    return <Loading />;
  }
  const HandleClick = async (e: any) => {
    e.preventDefault();
    console.log("Starting login with:", { email, password });

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error(`Lỗi đăng nhập: ${res.error}`);
      } else if (res?.ok) {
        console.log("Login successful");
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          redirect("/shop", RedirectType.replace);
        }, 1500);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Có lỗi không mong muốn xảy ra");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-[-50px] ">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
          <p className="text-gray-600">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={HandleClick} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Đăng nhập
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/auth/register"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 blur-xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-300 rounded-full opacity-30 -z-10"></div>
      </div>
    </div>
  );
}
