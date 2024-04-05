import { Footer } from "@/components/homepage/Footer";
import { Header } from "@/components/homepage/Header";
import { Outlet } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { OffersProvider } from "@/components/homepage/offers/OffersContext";
function HomePageLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div ref={parent} className="flex flex-col w-full overflow-auto">
      <Header />
      <OffersProvider>
        <Outlet />
      </OffersProvider>

      <Footer />
    </div>
  );
}

export default HomePageLayout;
