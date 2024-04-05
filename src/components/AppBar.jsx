import { useSelector } from "react-redux";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function AppBar() {
  return (
    <div className="flex justify-between  py-3 px-6 gap-8 items-center">
      <UserInfo />
      <div className="flex gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function UserInfo() {
  const user = useSelector((state) => state.user) || {};

  return (
    <div className="flex gap-3 items-center">
      <img
        className="h-8 w-8 object-cover rounded-full border-2 border-border text-center text-xs text-text-tertiary "
        src={user?.image || "/images/default-profile.jpg"}
        alt="profile image"
      />
      <div>
        <h3 className="font-medium text-sm text-text-primary">{`${user?.firstName} ${user?.lastName}`}</h3>
        <h4 className="capitalize text-xs text-text-tertiary">{user?.role}</h4>
      </div>
    </div>
  );
}
