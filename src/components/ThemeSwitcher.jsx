import { PiMoonStars, PiSunDim, PiLaptop } from 'react-icons/pi';
import { Button, DropDown } from './ui';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../app/reducer';
import { useTranslation } from 'react-i18next';

export function ThemeSwitcher({ size }) {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const icons = {
    dark: <PiMoonStars size={18} />,
    light: <PiSunDim size={18} />,
    system: <PiLaptop size={18} />,
  };

  return (
    <DropDown
      toggler={
        <Button size={size} shape='icon'>
          {icons[theme]}
        </Button>
      }
    >
      {Object.keys(icons).map((icon) => (
        <DropDown.Option key={icon} onClick={() => dispatch(changeTheme(icon))} isCurrent={theme === icon}>
          {icons[icon]}
          <span className='capitalize'>{t(`header.theme.${icon}`)}</span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
