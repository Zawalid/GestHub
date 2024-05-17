import { useForm, useUploadFile } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/index';
import { socials } from '@/components/ui/SocialMedia';
import { useSettings, useUpdateSettings } from '@/hooks/useUser';
import { Button } from '@/components/ui';

export default function General() {
  const { settings } = useSettings();
  
  const defaultValues = {
    appLogo: settings?.appLogo || { src: '/SVG/logo.svg', file: null },
    appName: settings?.appName || 'GestHub',
    companyName: settings?.companyName || 'DSI',
    email: settings?.email || 'company@example.com',
    phone: settings?.phone || '0674323434',
    location: settings?.location || 'Rabat',
    maps: settings?.maps || 'https://maps.app.goo.gl/fdserer',
    facebook: settings?.facebook || '',
    twitter: settings?.twitter || '',
    instagram: settings?.instagram || '',
    linkedin: settings?.linkedin || '',
    youtube: settings?.youtube || '',
  };
  const {
    Form,
    options: { isUpdated, handleSubmit, reset, getValue, setValue },
  } = useForm({
    defaultValues,
    fields: [
      {
        name: 'appName',
        label: 'App Name',
      },
      {
        name: 'companyName',
        label: 'Company Name',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'phone',
      },
      {
        name: 'location',
        label: 'Location ',
        type: 'location',
      },
      {
        name: 'maps',
        label: 'Google Maps Link',
        type: 'maps',
        placeholder: 'https://maps.app.goo.gl/',
        rules: {
          pattern: {
            value: new RegExp('^\\s*(https://maps\\.google\\.com|https://maps\\.app\\.goo\\.gl).*\\s*$', 'i'),
            message: 'Invalid URL. Please enter a valid Google Maps link.',
          },
        },
      },
      ...socials.map((s) => ({
        name: s.name.toLocaleLowerCase(),
        label: s.name,
        placeholder: s.href,
        rules: {
          pattern: {
            value: new RegExp(`^(https://www\\.${s.name.toLocaleLowerCase()}\\.com)/.*$`),
            message: `Invalid URL. Please enter a valid ${s.name} link.`,
          },
          required: false,
        },
        customIcon: (
          <span
            className='absolute left-0 top-0 z-10 grid h-full w-7 place-content-center border-r border-border text-white'
            style={{ backgroundColor: s.color }}
          >
            {s.icon}
          </span>
        ),
      })),
    ],
    onSubmit: (data) => {
      const formData = new FormData();
      for (const el in data) {
        formData.append(el, el === 'appLogo' ? data[el].file : data[el]);
      }
      mutate(formData);
    },
    gridLayout: true,
  });
  const { openFilePicker } = useUploadFile({ onChange: (logo) => setValue('appLogo', logo) });
  const { mutate, isPending } = useUpdateSettings();

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      <div className='space-y-5'>
        <h3 className='mb-3 font-bold text-text-secondary'>Basic Info</h3>
        <div>
          <img
            className={`h-28 w-28  border border-border text-center text-xs text-text-tertiary ${
              name === 'Image' ? 'rounded-full object-cover' : 'rounded-lg object-contain'
            }`}
            src={getValue('appLogo')?.src}
          />
          <Button
            type='outline'
            className='min-w-[132px] flex-1 disabled:text-text-disabled disabled:hover:bg-background-disabled md:min-w-max'
            // disabled={disabled}
            onClick={openFilePicker}
          >
            Change Avatar
          </Button>
          <Button
            color='red'
            className='min-w-[132px] flex-1 md:min-w-max'
            // disabled={disabled || !avatar?.src}
            onClick={() => setValue('appLogo', { src: null, file: null })}
          >
            Remove Avatar
          </Button>
        </div>
        {Form}
      </div>
    </ModalFormLayout>
  );
}
