import { Button, DropDown } from "./ui";
import { FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";

export function AuthSwitcher({ size }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <DropDown
      toggler={
        <Button size={size} shape="icon">
          <FaUserAlt />
        </Button>
      }
    >
      {["login", "register"].map((e) => (
        <NavLink to={`/${e}`} key={e}>
          <DropDown.Option
            className={`${pathname.includes(e) && "bg-primary"}`}
          >
            {t(`header.auth.${e}`)}
          </DropDown.Option>
        </NavLink>
      ))}
    </DropDown>
  );
}
