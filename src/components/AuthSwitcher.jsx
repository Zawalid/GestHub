import { DropDown } from "./ui";
import { FaUserAlt } from "react-icons/fa";
import {useTranslation} from 'react-i18next'

export function AuthSwitcher({setIsSignInOpen,setIsRegisterOpen}) {
  const {t}=useTranslation()
  return (
    <DropDown
      toggler={<FaUserAlt />}
      togglerClassName="icon-button not-active"
    >
      {[{path:"login",action:setIsSignInOpen}, {path:"register",action:setIsRegisterOpen}].map((e) => (
        <DropDown.Option onClick={()=>e.action(e=>!e)}  key={e} >
          <span>{t(`header.auth.${e.path}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
