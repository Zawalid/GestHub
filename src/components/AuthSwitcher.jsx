import { DropDown } from "./ui";
import { FaUserAlt } from "react-icons/fa";

export function AuthSwitcher({setIsSignInOpen}) {

  return (
    <DropDown
      toggler={<FaUserAlt />}
      togglerClassName="icon-button not-active"
    >
      {["Sign in", "Sign up"].map((e) => (
        <DropDown.Option onClick={()=>setIsSignInOpen(e=>!e)}  key={e} >
          <span>{e}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
