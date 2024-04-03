import { Header } from "../components/homepage/Header";
import { Footer } from "../components/homepage/Footer";
import Hero from "../components/homepage/Hero";
import Offers from "../features/offers/Offers";
import { OffersProvider } from "../features/offers/OffersContext";
export function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <Header />
      <Hero />
      <OffersProvider>
        <Offers />
      </OffersProvider>
      <div className="h-screen py-[900px]">fcc</div>
      <Footer />
    </div>
  );
}
