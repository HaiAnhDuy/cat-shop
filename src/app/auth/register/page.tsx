"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/app/components/Loading";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const HandleClick = async (e: any) => {
    e.preventDefault();
    console.log({ username, password, confirmPassword, email });
    if (password !== confirmPassword) {
      return alert("Mật khẩu không khớp");
    }
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Đăng kí thành công");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        redirect("/auth/login", RedirectType.replace);
      }, 1500);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard"); // đá về dashboard
    }
  }, [session, router]);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h2>
          <p className="text-gray-600">Tạo tài khoản mới để bắt đầu!</p>
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
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên người dùng
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tên người dùng"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Đăng ký
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              href="/auth/login"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 blur-xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-orange-300 rounded-full opacity-30 -z-10"></div>
      </div>
    </div>
  );
}
