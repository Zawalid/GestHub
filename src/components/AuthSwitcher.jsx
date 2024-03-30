import { DropDown } from "./ui";
import { FaUserAlt } from "react-icons/fa";
import {useTranslation} from 'react-i18next'

export function AuthSwitcher({setIsSignInOpen}) {
  const {t}=useTranslation()
  return (
    <DropDown
      toggler={<FaUserAlt />}
      togglerClassName="icon-button not-active"
    >
      {["login", "signup"].map((e) => (
        <DropDown.Option onClick={()=>setIsSignInOpen(e=>!e)}  key={e} >
          <span>{t(`header.auth.${e}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
