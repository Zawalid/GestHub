import { useTranslation } from 'react-i18next';
import { PiMoonStars, PiSunDim, PiLaptop } from 'react-icons/pi';
import { Button, DropDown } from './ui';
import { useTheme } from '@/hooks/useTheme';

const icons = { dark: <PiMoonStars size={18} />, light: <PiSunDim size={18} />, system: <PiLaptop size={18} /> };

export function ThemeSwitcher({ size }) {
  const { theme : currentTheme, changeTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropDown
      toggler={
        <Button size={size} shape='icon'>
          {icons[currentTheme]}
        </Button>
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
