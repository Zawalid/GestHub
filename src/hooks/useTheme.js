import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../app/reducer';

export function useTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(theme));
  }, [theme, dispatch]);

  return theme;
}
