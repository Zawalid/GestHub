import { useCallback } from 'react';
import { useSettings } from './useUser';
import { toast } from 'sonner';
import { Button } from '@/components/ui';

export const useSendNotification = () => {
  const { settings } = useSettings();

  const notify = useCallback(
    (title, options, type) => {
      //* ------------ Local notifications using Sonner
      if (type === 'local')
        return toast(title, {
          important: true,
          duration: 3000,
          action: (
            <Button color='secondary' size='small' className='ml-auto' onClick={() => options.onClick?.(toast)}>
              View
            </Button>
          ),
          ...options,
          icon: (
            <div
              className={`absolute left-0 grid h-full w-12 place-content-center justify-center rounded-l-lg text-white ${options.icon?.className}`}
            >
              {options.icon?.icon}
            </div>
          ),
        });

      //* ------------ Notifications API
      if (!('Notification' in window)) console.log('This browser does not support desktop notification');

      const createNotification = (title, options) => {
        const notification = new Notification(title, {
          icon: settings?.appLogo?.src,
          ...options,
        });
        notification.onclick = function () {
          window.focus();
          options.onClick?.();
        };
      };

      if (Notification.permission === 'granted') createNotification(title, options);
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') createNotification(title, options);
        });
      }
    },
    [settings?.appLogo?.src]
  ); // Empty array means this callback won't ever change

  return notify;
};
