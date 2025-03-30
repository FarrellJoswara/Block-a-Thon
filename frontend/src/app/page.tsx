import Image from "next/image";
import HouseScroller from "../../components/HouseScroller";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <header className="flex flex-col gap-[8px] mx-auto">
        <h1 className="text-6xl font-bold text-center mx-auto">NFT Zillow</h1>
        </header>
        < HouseScroller />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
