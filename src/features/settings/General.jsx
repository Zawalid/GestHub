import { useForm } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/index';
import { ProfileAvatar } from './ProfileAvatar';
import { socials } from '@/components/ui/SocialMedia';
import { useSettings } from '@/hooks/useUser';

export default function General() {
  const { settings } = useSettings();
  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset },
  } = useForm({
    defaultValues: {
      logo: { src: null, file: null },
      appName: '',
      companyName: '',
      email: '',
      phone: '',
      location: '',
      maps: '',
    },
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
    ],
    onSubmit: () => {},
    gridLayout: true,
  });

  const {
    Form: SocialMedia,
    options: { setValue, getValue, isValid: isSocialMediaValid, isUpdated: isSocialMediaUpdated },
  } = useForm({
    defaultValues: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
    fields: socials.map((s) => ({
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
    gridLayout: true,
    onSubmit: () => {},
  });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated || !isValid || !isSocialMediaValid || !isSocialMediaUpdated,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated || isSocialMediaUpdated,
      }}
    >
      <div className='space-y-5'>
        <h3 className='mb-3 font-bold text-text-secondary'>Basic Info</h3>
        <div>
          <ProfileAvatar
            avatar={getValue('logo')}
            onChange={(logo) => setValue('logo', logo)}
            name='Logo'
            // disabled={isPending}
          />
        </div>
        {Form}
      </div>
      <div className='mt-5 border-t border-border pt-3'>
        <h3 className='mb-3 font-bold text-text-secondary'>Social Media</h3>
        {SocialMedia}
      </div>
    </ModalFormLayout>
  );
}
