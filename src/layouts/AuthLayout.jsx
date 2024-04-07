import { Footer } from "@/components/homepage/Footer";
import { Header } from "@/components/homepage/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });
  return (
    <div className=" h-screen flex flex-col justify-between">
      <Header />
      {/* <div className="z-10 self-start absolute right-0 flex w-full justify-between  p-3 gap-4">
        <Button size={"large"} onClick={() => navigate("/")} shape="icon">
          <BiHome />
        </Button>
        <div className="  flex gap-4 right-0 ">
          <LanguageSwitcher size={"large"} />
          <ThemeSwitcher size={"large"} />
        </div>
      </div> */}

      <div ref={parent} className=" flex w-full h-full p-5 md:p-0 pb-10">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default AuthLayout;
