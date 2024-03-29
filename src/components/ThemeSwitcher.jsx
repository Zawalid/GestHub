import { PiMoonStars, PiSunDim, PiLaptop } from "react-icons/pi";
import { DropDown } from "./ui";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../app/reducer";

export function ThemeSwitcher() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const icons = {
    dark: <PiMoonStars size={18} />,
    light: <PiSunDim size={18} />,
    system: <PiLaptop size={18} />,
  };

  return (
    <DropDown toggler={icons[theme]} togglerClassName="icon-button not-active">
      {Object.keys(icons).map((icon) => (
        <DropDown.Option
          key={icon}
          onClick={() => dispatch(changeTheme(icon))}
          isCurrent={theme === icon}
        >
          {icons[icon]}
          <span className="capitalize">{icon}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
