import Image from "next/image";
import { ContentOne, ContentTwo, Home, Header, Footer } from "@/components";
import BgSalesSky from "@/assets/bg-w-clouds.png";

export default function LandingPage() {
  return (
    <>
      <Image
        src={BgSalesSky}
        alt="Sales Image Digital North"
        className="absolute top-0 right-0 z-0 h-screen w-fit"
      />
      <Header />
      <main className="flex flex-col justify-center items-center">
        <Home />
        <ContentOne />
        <ContentTwo />
      </main>
      <Footer />
    </>
  );
}
