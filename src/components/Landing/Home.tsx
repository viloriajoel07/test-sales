import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components";
import SalesImage from "@/assets/Ilustration.png";

const Home = () => {
  return (
    <div className="max-w-[70rem] h-screen pt-16 flex flex-col-reverse md:flex-row justify-center items-center gap-6 relative px-10 md:px-0">
      <section className="z-10 flex flex-col items-center md:items-start">
        <h1 className="text-2xl lg:text-6xl font-bold text-slate-800 text-center md:text-start">
          Sales management system
        </h1>
        <p className="md:w-4/5 mt-4 text-gray-500 text-center md:text-start">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem a
          inventore quas sed officiis vitae repudiandae cumque facilis sit
          cupiditate.
        </p>
        <Link href="/auth">
          <Button className="mt-8">LOGIN</Button>
        </Link>
      </section>
      <Image
        src={SalesImage}
        alt="Sales Image Digital North z-10"
        width={500}
      />
    </div>
  );
};

export default Home;
