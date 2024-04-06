import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BiHome } from "react-icons/bi";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center items-center  w-full h-full">
      <div className="z-10 self-start absolute right-0 flex w-full justify-between  p-3 gap-4">
        <Button size={"large"} onClick={() => navigate("/")} shape="icon">
          <BiHome />
        </Button>
        <div className="  flex gap-4 right-0 ">
          <LanguageSwitcher size={"large"} />
          <ThemeSwitcher size={"large"} />
        </div>
      </div>

      <div ref={parent} className="absolute p-2 flex w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
