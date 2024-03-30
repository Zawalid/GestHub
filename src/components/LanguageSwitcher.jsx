import { Button, DropDown } from "./ui";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoLanguageOutline />
        </Button>
      }
    >
      {["en", "fr", "ar"].map((lang) => (
        <DropDown.Option
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          isCurrent={i18n.language === lang}
        >
          <span>{t(`header.languages.${lang}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
