import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Sidebar from "../components/Sidebar";
import Settings from "../components/settings/Settings";
import AppBar from "../components/AppBar";

export default function AppLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-full flex">
      <Sidebar openSettings={() => setIsSettingsOpen(true)} />
      <div className="ml-14 md:ml-0 flex-1 overflow-hidden px-3 sm:px-5 py-3 flex flex-col gap-6">
        <AppBar />
        <Main />
      </div>
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
      className="flex-1 overflow-x-hidden grid-rows-[min-content_auto] pr-1 sm:pr-3 overflow-y-auto grid gap-5 bg-background-primary"
      ref={parent}
    >
      <Outlet />
    </main>
  );
}
