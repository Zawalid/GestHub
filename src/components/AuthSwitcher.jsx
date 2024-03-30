import { Button, DropDown } from "./ui";
import { FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function AuthSwitcher({ setIsSignInOpen, setIsRegisterOpen }) {
  const { t } = useTranslation();
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <FaUserAlt />
        </Button>
      }
    >
      {[
        { path: "login", action: setIsSignInOpen },
        { path: "register", action: setIsRegisterOpen },
      ].map((e) => (
        <DropDown.Option onClick={() => e.action((e) => !e)} key={e.path}>
          <span>{t(`header.auth.${e.path}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
