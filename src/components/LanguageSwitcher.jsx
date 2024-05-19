import { Button, DropDown } from './ui';
import { useTranslation } from 'react-i18next';
import { IoChevronDownOutline, IoLanguageOutline } from 'react-icons/io5';

export function LanguageSwitcher({ size, layout }) {
  const { t, i18n } = useTranslation();

  return (
    <DropDown
      toggler={
        layout === 'long' ? (
          <Button size={size} display='with-icon' color='tertiary'>
            <IoLanguageOutline />
            <span className='flex-1 text-start capitalize'>{t(`header.languages.${i18n.language}`)}</span>
            <IoChevronDownOutline />
          </Button>
        ) : (
          <Button size={size} shape='icon'>
            <IoLanguageOutline />
          </Button>
        )
      }
    >
      {['en', 'fr', 'ar'].map((lang) => (
        <DropDown.Option key={lang} onClick={() => i18n.changeLanguage(lang)} isCurrent={i18n.language === lang}>
          <span>{t(`header.languages.${lang}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
