import Tippy from "@tippyjs/react";
import { NavLink, useHref } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Logo } from "../ui/logo";
import { routes } from "../../utils/constants";
import { MobileHeader } from "./MobileHeader";
import { useEffect, useState } from "react";
import { AuthSwitcher } from "../AuthSwitcher";
import Login from "../auth/Login";
import { useTranslation } from "react-i18next";
import Register from "../auth/Register";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const currentPath = useHref().split("/")[1];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className="flex items-center justify-between  border-b border-border bg-background-primary p-5 shadow-md">
      <Logo className="w-20" />
      <Links />

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <AuthSwitcher
          setIsRegisterOpen={setIsRegisterOpen}
          setIsSignInOpen={setIsSignInOpen}
        />

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="icon-button not-active lg:hidden"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      <MobileHeader
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Login isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </header>
  );
}

// Links

function Links() {
  const { t } = useTranslation();
  return (
    <ul className="hidden gap-8 lg:flex lg:flex-1 lg:justify-center ">
      {routes.map((route) => (
        <NavLink key={route.label} to={route.path}>
          <DropDown paths={route.nested || []}>
            <li className="relative flex items-center gap-3 font-semibold text-text-secondary transition-colors duration-300 before:absolute before:-bottom-[30px] before:left-1/2 before:h-[1px] before:w-full before:-translate-x-1/2 before:scale-0 before:bg-text-tertiary before:transition-transform before:duration-500 hover:text-text-tertiary hover:before:scale-100">
              <span>{t(`header.navbar.${route.label}`)}</span>
              {route.nested && <FaChevronDown />}
            </li>
          </DropDown>
        </NavLink>
      ))}
    </ul>
  );
}

function DropDown({ children, paths }) {
  return (
    <Tippy
      content={
        <ul>
          {paths.map((option) => (
            <li
              key={option.label}
              className="border-t border-border px-5 py-3 font-semibold text-text-secondary first:border-none hover:text-text-tertiary "
            >
              {option.label}
            </li>
          ))}
        </ul>
      }
      arrow={false}
      interactive={true}
      trigger="mouseenter"
      className="mt-3 border border-border bg-background-primary  shadow-lg"
      placement="bottom-start"
    >
      {children}
    </Tippy>
  );
}
