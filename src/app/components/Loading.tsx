"use client";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <ClipLoader size={50} color="#4f46e5" />
    </div>
  );
}
