import { useEffect, useRef, useState } from "react";
import { NavLink as L } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { Logo } from "../ui/logo";
import { routes } from "../../utils/constants";
import { SocialMedia } from "../ui/SocialMedia";
import { useTranslation } from "react-i18next";
import { PiX } from "react-icons/pi";
export function MobileHeader({ isOpen, onClose }) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <div
        className={
          "fixed left-0 top-0  h-full w-full " +
          (isOpen ? "z-50 bg-black bg-opacity-40 " : "invisible")
        }
      ></div>
      <div
        className={
          "fixed right-0 top-0 z-50  flex h-full w-full flex-col gap-5 justify-self-end overflow-auto bg-background-primary transition-transform duration-500 sm:w-[320px] " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
        ref={ref}
      >
        <div className="flex items-center justify-between  px-5 pt-5">
          <Logo className="w-20" />
          <button
            className="icon-button  not-active small text-text-tertiary"
            onClick={onClose}
          >
            <PiX />
          </button>
        </div>
        <Links />
        <div className="mt-auto grid grid-cols-5 border-t border-border p-2">
          <SocialMedia color="text-text-primary" />{" "}
        </div>
      </div>
    </>
  );
}

// Links
function Links() {
  return (
    <ul className=" border-t border-border">
      {routes.map((route) => (
        <Link key={route.label} route={route} />
      ))}
    </ul>
  );
}
function Link({ route }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li key={route.label}>
      <div className="flex  items-center justify-between border-b border-border py-3 pl-5 font-semibold text-text-primary transition-colors duration-300 hover:text-text-tertiary">
        <L to={route.path}>{t(`header.navbar.${route.label}`)}</L>
        {route.nested && (
          <button
            className="border-l border-border px-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FaChevronDown
              className={`text-sm transition-transform duration-500 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
      {route.nested && (
        <DropDown routes={route.nested} isExpanded={isExpanded} />
      )}
    </li>
  );
}
function DropDown({ routes, isExpanded }) {
  return (
    <ul
      className="overflow-hidden bg-background-primary transition-[height]  duration-500"
      style={{
        height: isExpanded ? `${routes.length * 49}px` : "0px",
      }}
    >
      {routes.map((route) => (
        <li
          key={route.label}
          className="border-b border-border px-10 py-3 font-semibold text-text-secondary transition-colors duration-300 hover:text-text-tertiary "
        >
          <L to={route.path}>{route.label}</L>
        </li>
      ))}
    </ul>
  );
}
