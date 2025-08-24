import Image from "next/image";
import HeroPage from "./components/HeroPage";
export default function Home() {
  return (
    <main className="lg:fixed">
      <HeroPage />
    </main>
  );
}
