import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { BiSolidDashboard } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { FiLogOut, FiSettings } from "react-icons/fi";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { ROUTES } from "../utils/constants";

const routesIcons = {
  overview: <BiSolidDashboard />,
  interns: <BsFillPeopleFill />,
  teams: <RiTeamFill />,
  supervisors: <FaChalkboardTeacher />,
  absences: <FaCalendarCheck />,
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const role = useSelector((state) => state.user?.role);

  const { t } = useTranslation();

  useEffect(() => {
    const onresize = () =>
      setIsExpanded(window.matchMedia("(min-width: 1024px)").matches);

    window.addEventListener("resize", onresize);

    return () => window.removeEventListener("resize", onresize);
  }, [isExpanded]);

  return (
    <aside
      className={`flex flex-col overflow-hidden transition-[width] py-5 duration-500 gap-8 bg-background-secondary rounded-xl ${
        isExpanded ? "w-[250px] px-3 " : "w-14 px-2"
      }`}
    >
      <div className="flex items-center justify-between ">
        <img
          src="/images/logo-MEN-Stage.png"
          alt="logo"
          className={`transition-all duration-500 object-contain ${
            isExpanded ? "scale-100 w-28" : "w-0 scale-0"
          }`}
        />
        <button
          className={`icon-button self-center not-active ${
            isExpanded ? "" : "mx-auto"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <BsLayoutSidebarInset />
          ) : (
            <BsLayoutSidebarInsetReverse />
          )}
        </button>
      </div>
      <ul className="space-y-1">
        {ROUTES[role].map((route) => (
          <li key={route}>
            <NavLink to={`/app/${route}`} className="sidebar_element group">
              {routesIcons[route]}
              <span
                className={`text-sm text-text-secondary ${
                  isExpanded ? "inline" : "hidden"
                }`}
              >
                {t(`app.sidebar.${route}`)}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <button className="w-full sidebar_element group">
            <FiSettings />
            <span
              className={`text-sm capitalize text-text-secondary ${
                isExpanded ? "inline" : "hidden"
              }`}
            >
              {t("app.sidebar.settings")}
            </span>
          </button>
          <div className="flex items-center gap-1">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        <button className="w-full sidebar_element group">
          <FiLogOut />
          <span
            className={`text-sm capitalize text-text-secondary ${
              isExpanded ? "inline" : "hidden"
            }`}
          >
            {t("app.sidebar.logout")}
          </span>
        </button>
      </div>
    </aside>
  );
}
