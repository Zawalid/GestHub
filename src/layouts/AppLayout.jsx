import { Outlet } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Sidebar from "../components/Sidebar";
import Settings from "../components/settings/Settings";
import { useState } from "react";

export default function AppLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div className="flex ">
      <Sidebar openSettings={() => setIsSettingsOpen(true)} />
      <Main />
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
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
