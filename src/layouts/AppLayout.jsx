import { Outlet } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <Main />
    </div>
  );
}

function Main() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <main
      className="relative  grid flex-1 grid-rows-[min-content_auto_min-content] gap-3 overflow-hidden bg-background-primary"
      ref={parent}
    >
      <Outlet />
    </main>
  );
}
