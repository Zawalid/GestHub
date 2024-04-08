import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Sidebar from "../components/Sidebar";
import Settings from "../features/settings/Settings";
import AppBar from "../components/AppBar";
import { ModalProvider } from "@/context/ConfirmationModal";

export default function AppLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-full h-full flex">
      <Sidebar openSettings={() => setIsSettingsOpen(true)} />
      <div className="ml-14 md:ml-0 flex-1 p-1.5 overflow-hidden bg-background-secondary  flex flex-col">
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
    <ModalProvider>
      <main
        className="flex-1 rounded-2xl p-5 overflow-x-hidden grid-rows-[min-content_auto] pr-1 sm:pr-3 overflow-y-auto grid gap-5 bg-background-primary"
        ref={parent}
      >
        <Outlet />
      </main>
    </ModalProvider>
  );
}
