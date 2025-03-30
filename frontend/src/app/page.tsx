import Image from "next/image";
import HouseScroller from "../../components/HouseScroller";
import TestMetaMask from "./components/TestMetaMask";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-white">
      <header className="flex flex-col gap-[5px] mx-auto bg-gray-900 rounded-lg p-4 shadow-md border border-gray-700 w-full">
        <h1 className="text-6xl font-bold text-center mx-auto">NFT Zillow</h1>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        
        < HouseScroller />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
      <TestMetaMask />
    </div>
    
  );
}