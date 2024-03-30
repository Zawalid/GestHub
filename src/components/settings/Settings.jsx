import { useEffect, useState } from "react";
import { PiArrowRight, PiX } from "react-icons/pi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Panel } from "./Panel";
import Password from "./Password";
import Profile from "./Profile";
import { Button, Modal } from "../ui";

export default function Settings({ isOpen, onClose }) {
  const [currentTab, setCurrentTab] = useState("profile");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [key, setKey] = useState();

  useEffect(() => {
    setCurrentTab("profile");
    setKey(Math.random());
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative h-full w-full overflow-hidden sm:flex-row md:h-[90%] md:w-5/6 md:border lg:w-3/4"
    >
      <div className="absolute z-10 left-0 top-0 flex w-full justify-between border-b border-border bg-background-primary px-5 py-2 sm:left-[200px] sm:w-[calc(100%-200px)]">
        <h3 className="text-lg font-bold capitalize text-text-primary sm:text-xl">
          {currentTab}
        </h3>
        <div className="flex gap-2">
          <Button
            className="sm:hidden" shape='icon'
            size="small"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            <PiArrowRight className={isPanelOpen ? "rotate-180" : ""} />
          </Button>
          <Button className="sm:hidden" shape='icon' size="small" onClick={onClose}>
            <PiX />
          </Button>
        </div>
      </div>
      <Panel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <Content currentTab={currentTab} key={key} />
    </Modal>
  );
}

function Content({ currentTab }) {
  const [parent] = useAutoAnimate({ duration: 300 });

  const tabs = {
    profile: <Profile />,
    password: <Password />,
    // general: <General />,
  };

  return (
    <div
      className="flex flex-1 flex-col gap-3 overflow-hidden pb-4 pt-16  transition-opacity duration-500 child-padding "
      ref={parent}
    >
      {tabs[currentTab]}
    </div>
  );
}
