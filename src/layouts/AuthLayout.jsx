import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BiHome } from "react-icons/bi";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const navigate = useNavigate();
  return (
    <div className=" grid grid-cols-1 md:grid-cols-[1fr,1fr]  h-full w-full">
      <div className=" hidden md:flex h-screen  relative justify-center items-center bg-gradient-to-l from-background-tertiary -background-primary  ">
        <img src="/images/logo-MEN.png" className="w-2/3 " alt="" />
      </div>
      <div
        ref={parent}
        className=" flex flex-col w-full h-full md:h-screen md:overflow-auto p-2 md:p-0 "
      >
        <div>
          <div className="  flex w-full justify-between  p-2 md:p-3 gap-4">
            <Button size={"large"} onClick={() => navigate("/")} shape="icon">
              <BiHome />
            </Button>
            <div className="  flex gap-4 right-0 ">
              <LanguageSwitcher size={"large"} />
              <ThemeSwitcher size={"large"} />
            </div>
          </div>
          <div className="md:hidden flex justify-center items-center">
            <img src="/images/logo-MEN.png" className="w-1/2" alt="" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

