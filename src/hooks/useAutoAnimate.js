import { useEffect } from 'react';
import { useAutoAnimate as animate } from '@formkit/auto-animate/react';
import { useSettings } from '@/features/settings/useSettings';

export function useAutoAnimate(options) {
  const { settings } = useSettings(true);
  const [parent, enable] = animate(options);

  useEffect(() => {
    enable(settings.animations);
  }, [settings.animations, enable]);

  return [parent];
}
