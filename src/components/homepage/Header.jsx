import Tippy from "@tippyjs/react";
import { NavLink, useHref } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { routes } from "../../utils/constants";
import { MobileHeader } from "./MobileHeader";
import { useEffect, useState } from "react";
import { AuthSwitcher } from "../AuthSwitcher";
import { useTranslation } from "react-i18next";
import { Button } from "../ui";
import Shade from "../ui/shade";
import { Logo } from "../ui/logo";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = useHref().split("/")[1];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className=" flex items-center justify-between  bg-background-secondary pt-2 p-5 lg:px-20 shadow-md">
      <Logo className="w-20" />
      <Links />

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <AuthSwitcher />

        <Button
          shape="icon"
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden"
        >
          <RxHamburgerMenu />
        </Button>
      </div>

      <MobileHeader
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Shade className="absolute top-16 z-10 left-0 w-full overflow-hidden leading-[0]" />
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
            <li className="relative flex items-center gap-3 font-semibold text-text-primary transition-colors duration-300 hover:text-primary ">
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
