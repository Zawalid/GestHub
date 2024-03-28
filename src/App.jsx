import { PiDotsThreeOutlineVerticalFill, PiX } from "react-icons/pi";
import { PiMoonStars, PiSunDim } from "react-icons/pi";
import {
  DropDown,
  SearchInput,
  InputField,
  Button,
  Switch,
  CheckBox,
  ViewControl,
  Modal,
} from "./components/ui";
import "./styles/App.css";
import { useState } from "react";
import { PasswordInput } from "./components/ui/PasswordInput";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { t } = useTranslation();

  return (
    <div className="p-5 overflow-auto space-y-3">
      <DropDown toggler={<PiDotsThreeOutlineVerticalFill />}>
        <DropDown.Option isCurrent={true}>Option 1</DropDown.Option>
        <DropDown.Option>Option 2</DropDown.Option>
        <DropDown.Option>Option 3</DropDown.Option>
      </DropDown>
      <SearchInput placeholder="Search..." />
      <InputField placeholder="Email" name="email" />
      <PasswordInput placeholder="Password" />
      <Button>Do something</Button>
      <Button disabled={true}>Do something</Button>
      {/* <Button isLoading={true}>Do something</Button> */}
      <Button size="small">Do something</Button>
      <Button size="large">Do something</Button>
      <Switch />
      <Switch checked={true} />
      <CheckBox />
      <CheckBox checked={true} />
      <ViewControl />
      <Button onClick={() => setIsOpen(true)}>{t("openModal")}</Button>

      <DropDown
        toggler={<IoLanguageOutline />}
        togglerClassName="icon-button not-active"
      >
        <DropDown.Option>English</DropDown.Option>
      </DropDown>

      <Modal
        isOpen={isOpen}
        className="relative h-full w-full overflow-hidden sm:flex-row md:h-[90%] md:w-5/6 md:border lg:w-3/4"
      >
        <h1 className="text-text-primary">Content....</h1>
        onClick={() => setIsOpen(false)}
        >
        <PiX />
      </Modal>
      <ThemeToggler
        theme={theme}
        setTheme={(theme) => {
          setTheme(theme);
          document.documentElement.className = theme;
        }}
      />
    </div>
  );
}

function ThemeToggler({ theme, setTheme }) {
  // const { themeMode } = useSelector((state) => state.settings.theme);
  // const dispatch = useDispatch();

  return (
    <DropDown.Option
      onClick={() =>
        // dispatch(changeThemeMode(themeMode === 'dark' ? 'light' : 'dark'))
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="relative py-[18px]"
      id="themeToggler"
    >
      <div className={theme === "dark" ? "translate-y-9" : "translate-y-0"}>
        <PiMoonStars size={18} />
        <span>Dark Mode</span>
      </div>
      <div className={theme === "light" ? "translate-y-9" : "translate-y-0"}>
        <PiSunDim size={18} />
        <span>Light Mode</span>
      </div>
    </DropDown.Option>
  );
}
