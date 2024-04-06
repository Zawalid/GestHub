import About from "@/components/homepage/About";
import Hero from "@/components/homepage/Hero";
import Offers from "@/features/offers/Offers";


export function HomePage() {
  return (
    <>
      <Hero />
        <Offers />
      <About />
    </>
  );
}
