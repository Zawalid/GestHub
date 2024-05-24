import { useTranslation } from 'react-i18next';
import { PiMoonStars, PiSunDim } from 'react-icons/pi';
import { Button, DropDown } from './ui';
import { useTheme } from '@/hooks/useTheme';
import { IoChevronDownOutline } from 'react-icons/io5';

const icons = { dark: <PiMoonStars size={18} />, light: <PiSunDim size={18} /> };

export function ThemeSwitcher({ size, layout }) {
  const { theme: currentTheme, changeTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropDown
      toggler={
        layout === 'long' ? (
          <Button size={size} display='with-icon' color='tertiary'>
            {icons[currentTheme]}
            <span className='flex-1 text-start capitalize'>{t(`header.theme.${currentTheme}`)}</span>
            <IoChevronDownOutline />
          </Button>
        ) : (
          <Button size={size} shape='icon'>
            {icons[currentTheme]}
          </Button>
        )
      }
    >
      {Object.keys(icons).map((theme) => (
        <DropDown.Option key={theme} onClick={() => changeTheme(theme)} isCurrent={theme === currentTheme}>
          {icons[theme]}
          <span className='capitalize'>{t(`header.theme.${theme}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
