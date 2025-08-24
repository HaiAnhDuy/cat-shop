import Image from "next/image";
import Link from "next/link";
export default function HeroPage() {
  return (
    <div className=" min-h-screen flex items-center justify-center px-4 lg:px-16 xl:px-32 relative overflow-hidden">
      <div className="absolute left-12 top-20 w-32 h-32 bg-orange-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute right-20 bottom-20 w-24 h-24 bg-orange-300 rounded-full opacity-30"></div>
      <div className="absolute left-1/4 bottom-32 w-16 h-16 bg-orange-200 rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                Cat Shop
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The friendly and{" "}
              <span className="block">caring small pet store</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
              At et vehicula sodales est proin turpis pellentesque sinulla a
              aliquam amet rhoncus quisque eget sit
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                <Link href="/shop">Shop Now</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full max-w-lg mx-auto">
            <div
              className="w-80 h-80 lg:w-96 lg:h-96 bg-cover bg-center bg-no-repeat rounded-full mx-auto relative overflow-hidden shadow-2xl"
              style={{ backgroundImage: "url(/cat1.jpg)" }}
            >
              <div className="absolute top-8 left-8 w-6 h-6 bg-white/20 rounded-full"></div>
              <div className="absolute top-16 right-12 w-4 h-4 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-20 left-12 w-5 h-5 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-12 right-8 w-6 h-6 bg-white/20 rounded-full"></div>
            </div>

            <div className="absolute top-4 right-4 w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-xl flex items-center justify-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-2xl lg:text-3xl">🐈</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-300 rounded-full opacity-60"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-20">
        <div className="w-8 h-8 bg-orange-400 rounded-full relative">
          <div className="absolute top-1 left-1.5 w-2 h-2 bg-orange-600 rounded-full"></div>
          <div className="absolute top-1 right-1.5 w-2 h-2 bg-orange-600 rounded-full"></div>
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-orange-600 rounded-full"></div>
        </div>
        <div className="w-6 h-6 bg-orange-300 rounded-full relative">
          <div className="absolute top-0.5 left-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="absolute top-0.5 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-orange-500 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-orange-400 rounded-full relative">
          <div className="absolute top-1 left-1.5 w-2 h-2 bg-orange-600 rounded-full"></div>
          <div className="absolute top-1 right-1.5 w-2 h-2 bg-orange-600 rounded-full"></div>
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-orange-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
