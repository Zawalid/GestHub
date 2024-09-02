import { PiCheckBold } from 'react-icons/pi';
import { useSettings, useUpdateSettings } from './useSettings';
import { useForm } from '@/hooks';
import { ModalFormLayout } from '@/layouts';
import { DropDown, Switch } from '@/components/ui';
import { useRoutes } from '@/hooks/useRoutes';
import { updateUISettings } from '@/utils/helpers';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function Preferences({ currentTab }) {
  const { settings } = useSettings(true);
  const { mutate } = useUpdateSettings(true);
  const { sidebar } = useRoutes();

  const { notificationsSound, deleteConfirmation, animations, defaultHomeView, toastPosition, theme } = settings;

  const {
    options: { isUpdated, handleSubmit, reset, getValue, setValue },
  } = useForm({
    defaultValues: { notificationsSound, deleteConfirmation, animations, defaultHomeView, toastPosition, theme },
    fields: [],
    onSubmit: (data) => {
      mutate({ ...settings, ...data });
      updateUISettings(data);
    },
  });

  useEffect(() => {
    return () => {
      const settings = JSON.parse(localStorage.getItem('local_settings'));
      updateUISettings(settings);
    };
  }, [currentTab]);

  return (
    <ModalFormLayout
      submitButton={{ onClick: handleSubmit, disabled: !isUpdated }}
      cancelButton={{
        onClick: () => reset(() => updateUISettings(settings)),
        disabled: !isUpdated,
      }}
    >
      <div className='space-y-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-bold text-text-secondary'>Notifications Sound</h4>
            <p className='mt-2 text-xs text-text-tertiary'>Play a sound when a notification is received.</p>
          </div>
          <Switch
            checked={getValue('notificationsSound')}
            onChange={(e) => setValue('notificationsSound', e.target.checked)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-bold text-text-secondary'>
              Confirm Deletion
              <span className='ml-2 text-xs text-text-tertiary'>(recommended)</span>
            </h4>
            <p className='mt-2 text-xs text-text-tertiary'>Ask for confirmation before deleting an element.</p>
          </div>
          <Switch
            checked={getValue('deleteConfirmation')}
            onChange={(e) => setValue('deleteConfirmation', e.target.checked)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-bold text-text-secondary'>
              Animations
              <span className='ml-2 text-xs text-text-tertiary'>(recommended)</span>
            </h4>
            <p className='mt-2 text-xs text-text-tertiary'>
              For a richer and more interactive experience, keep animations enabled.
            </p>
          </div>
          <Switch
            checked={getValue('animations')}
            onChange={(e) => {
              setValue('animations', e.target.checked);
              updateUISettings({ animations: e.target.checked }, 'animations');
            }}
          />
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-bold text-text-secondary'>Default Home View</h4>
            <p className='mt-2 text-xs text-text-tertiary'>Choose what to show when you open the app.</p>
          </div>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className='capitalize'>{getValue('defaultHomeView')}</span>
              </DropDown.Toggler>
            }
            options={{ className: 'w-48 overflow-auto' }}
          >
            {sidebar
              .map((s) => s.name)
              .map((tab) => (
                <DropDown.Option
                  key={tab}
                  isCurrent={tab === getValue('defaultHomeView')}
                  onClick={() => setValue('defaultHomeView', tab)}
                >
                  <span className='capitalize'>{tab}</span>
                </DropDown.Option>
              ))}
          </DropDown>
        </div>
        <ToastPosition getValue={getValue} setValue={setValue} />
        <Theme getValue={getValue} setValue={setValue} />
      </div>
    </ModalFormLayout>
  );
}

function ToastPosition({ getValue, setValue }) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h4 className='font-bold text-text-secondary'>Toast Position</h4>
        <p className='mt-2 text-xs text-text-tertiary'>Choose where to show the toast notifications.</p>
      </div>
      <div className='grid grid-cols-3 gap-2 rounded-lg border border-border bg-background-primary p-2'>
        {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((position) => (
          <button
            key={position}
            className={`grid h-6 w-6 place-content-center rounded-full border-2 border-border bg-background-primary transition-transform duration-300 ${getValue('toastPosition') === position ? 'scale-105' : 'scale-90 hover:scale-100'}`}
            onClick={() => {
              setValue('toastPosition', position);
              toast.success('Example toast notification', { position, id: 'toast-position' });
            }}
          >
            <span
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${getValue('toastPosition') === position ? 'bg-primary' : 'bg-background-secondary'}`}
            ></span>
            <span className='sr-only'>{position}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Theme({ getValue, setValue }) {
  return (
    <div>
      <h4 className='font-bold text-text-secondary'>Themes</h4>
      <p className='mt-2 text-xs text-text-tertiary'>Choose a theme for your interface.</p>
      <div className='mt-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3'>
        {['indigo', 'green', 'crimson', 'orange', 'purple', 'teal', 'maroon'].map((theme) => (
          <button
            key={theme}
            className={`theme ${theme} grid h-20 cursor-pointer grid-cols-[50px_auto] gap-1 overflow-hidden rounded-lg border border-border bg-background-primary transition-transform duration-300  ${getValue('theme') === theme ? 'scale-105' : 'scale-90 hover:scale-100'}`}
            onClick={() => {
              setValue('theme', theme);
              updateUISettings({ theme }, 'theme');
            }}
          >
            <span className='h-full space-y-1 rounded-sm bg-background-secondary p-2'>
              <span className='block h-1.5 w-full rounded-lg bg-primary'></span>
              <span className='block h-1.5 w-full rounded-lg bg-background-tertiary'></span>
              <span className='block h-1.5 w-full rounded-lg bg-background-tertiary'></span>
              <span className='block h-1.5 w-full rounded-lg bg-background-tertiary'></span>
            </span>
            <span className='flex flex-col gap-2 p-2'>
              <span className='flex items-center justify-between'>
                <span className='text-xs font-bold capitalize text-primary'>{theme}</span>
                {getValue('theme') === theme && <PiCheckBold className='text-sm text-primary' />}
              </span>
              <div className='grid grid-cols-[repeat(auto-fill,minmax(20px,auto))] gap-1'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className='rounded-sm bg-background-secondary p-2'></span>
                ))}
              </div>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
