import { cloneElement } from "react";
import { PiGear, PiLockKey, PiUserCircle } from "react-icons/pi";
import { Overlay } from "../../ui/Modal";

export function Panel({ isOpen, onClose, currentTab, setCurrentTab }) {
  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div
        className={`absolute top-0 z-40 flex h-full w-[200px] flex-col items-start gap-3 border-r border-border bg-background-secondary p-3  shadow-md transition-[left]  duration-500 sm:static sm:pt-[45px] sm:shadow-none ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <Tab
          tabName="profile"
          icon={<PiUserCircle />}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <Tab
          tabName="password"
          icon={<PiLockKey />}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {/* <Tab
          tabName="general"
          icon={<PiGear />}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        /> */}
      </div>
    </>
  );
}

function Tab({ tabName, icon, currentTab, setCurrentTab }) {
  return (
    <button
      className={
        "sidebar_element w-full gap-2 " +
        (currentTab === tabName
          ? "active text-text-secondary"
          : "text-text-tertiary")
      }
      onClick={() => setCurrentTab(tabName)}
    >
      {cloneElement(icon, { size: "22" })}
      <span className="font-medium capitalize">{tabName}</span>
    </button>
  );
}
