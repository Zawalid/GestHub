import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  BiSolidDashboard,
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
  BsPeople,
  FiLogOut,
  IoSettingsOutline,
  IoBriefcaseOutline,
  IoDocumentsOutline,
  IoHomeOutline,
  LiaUserTieSolid,
  LuCalendarX,
  RiTeamLine,
} from "./ui/Icons";

import { ROUTES } from "../utils/constants";
import { Button } from "./ui";

const routesIcons = {
  overview: <IoHomeOutline />,
  interns: <BsPeople />,
  teams: <RiTeamLine />,
  supervisors: <LiaUserTieSolid />,
  absences: <LuCalendarX />,
  offers: <IoBriefcaseOutline />,
  demands: <IoDocumentsOutline />,
  projects: <BiSolidDashboard />,
};

export default function Sidebar({ openSettings }) {
  const [isExpanded, setIsExpanded] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );
  const role = useSelector((state) => state.user?.role);
  const { t } = useTranslation();

  const spanClass = `transition-transform origin-left duration-500 text-sm text-text-secondary ${
    isExpanded ? "md:scale-100" : "scale-0"
  }`;

  useEffect(() => {
    const onresize = () =>
      setIsExpanded(window.matchMedia("(min-width: 1024px)").matches);

    window.addEventListener("resize", onresize);

    return () => window.removeEventListener("resize", onresize);
  }, [isExpanded]);

  return (
    <aside
      className={`flex top-0 z-[15] h-full row-span-2 flex-col overflow-hidden transition-[width] py-5 duration-500 gap-8 fixed md:relative bg-background-secondary ${
        isExpanded ? "md:w-[250px]  w-full px-3" : "w-14 px-2"
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
        <Button
          shape="icon"
          className={`self-center not-active ${isExpanded ? "" : "mx-auto"}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <BsLayoutSidebarInset />
          ) : (
            <BsLayoutSidebarInsetReverse />
          )}
        </Button>
      </div>
      <ul className="space-y-1">
        {ROUTES[role]
          .filter((r) => !r.includes("/:"))
          .map((route) => (
            <li key={route}>
              <NavLink to={`/app/${route}`} className="sidebar_element group">
                {routesIcons[route]}
                <span className={spanClass}>{t(`app.sidebar.${route}`)}</span>
              </NavLink>
            </li>
          ))}
      </ul>

      <div className="mt-auto">
        <button className="w-full sidebar_element group" onClick={openSettings}>
          <IoSettingsOutline />
          <span className={spanClass}>{t("app.sidebar.settings")}</span>
        </button>
        <button className="w-full sidebar_element group">
          <FiLogOut />
          <span className={spanClass}>{t("app.sidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
}
