import { useForm, useUploadFile } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/index';
import { socials } from '@/components/ui/SocialMedia';
import { useSettings, useUpdateSettings } from '@/hooks/useUser';
import { FaCamera } from 'react-icons/fa6';
import { GrMapLocation } from 'react-icons/gr';

export default function General() {
  const { settings } = useSettings();

  const defaultValues = {
    appLogo: settings?.appLogo,
    appName: settings?.appName || 'App Name',
    companyName: settings?.companyName || 'Company Name',
    email: settings?.email || 'exemple@gmail.com',
    phone: settings?.phone || '0611223344',
    location: settings?.location || 'Your Location',
    maps: settings?.maps || 'https://www.google.com/maps/embed?',
    facebook: settings?.facebook,
    twitter: settings?.twitter,
    instagram: settings?.instagram,
    linkedin: settings?.linkedin,
    youtube: settings?.youtube,
  };
  const {
    options: { formInputs, isUpdated, errors, handleSubmit, reset, getValue, setValue },
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
        label: 'Embedded Google Maps',
        type: 'maps',
        placeholder: 'https://www.google.com/maps/embed?',
        rules: {
          pattern: {
            value: new RegExp('^\\s*(https://www\\.google\\.com/maps/embed\\?).*\\s*$', 'i'),
            message: 'Invalid URL. Please enter a valid Google Maps embed link.',
          },
        },
      },
      ...socials.map((s) => ({
        name: s.name.toLocaleLowerCase(),
        label: s.name,
        placeholder: s.href,
        rules: {
          pattern: {
            value: new RegExp(`^((http|https):\\/\\/)?(www\\.)?${s.name.toLocaleLowerCase()}\\.com/.*$`),
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
        console.log(data[el]);
        formData.append(el, el === 'appLogo' ? data[el].file : data[el] || '');
      }
      mutate(formData);
    },
    gridLayout: true,
  });
  const { openFilePicker } = useUploadFile({ onChange: (logo) => setValue('appLogo', logo) });
  const { mutate } = useUpdateSettings();

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
      className='space-y-7'
    >
      <div className='space-y-5'>
        <h3 className='mb-3 font-bold text-text-secondary'>Basic Info</h3>
        <div className='flex flex-col mobile:flex-row items-center gap-5'>
          <div className='space-y-2 w-fit'>
            <div className='group relative overflow-hidden rounded-lg'>
              <button
                className='left 0 absolute top-0 grid h-full w-full place-content-center bg-background-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-80 '
                onClick={openFilePicker}
              >
                <FaCamera />
              </button>
              <img
                className='h-36 w-36  rounded-lg border border-border object-contain text-center text-xs text-text-tertiary'
                src={getValue('appLogo')?.src}
              />
            </div>
          </div>
          <div className='grid w-full xs:grid-cols-2 gap-5'>
            {formInputs['appName']}
            {formInputs['companyName']}
            {formInputs['email']}
            {formInputs['phone']}
          </div>
        </div>
      </div>
      <div>
        <h3 className='mb-3 font-bold text-text-secondary'>Location</h3>
        <div className='grid sm:grid-cols-2 items-center gap-5'>
          <div className='space-y-3'>
            {formInputs['location']}
            {formInputs['maps']}
          </div>

          <div className='relative rounded-lg border border-border p-3'>
            {errors?.['maps'] && (
              <div className='absolute left-0 top-0 grid h-full w-full place-content-center place-items-center gap-1.5 bg-background-secondary'>
                <GrMapLocation className='text-2xl' />
                <p className='text-xs font-medium text-text-tertiary'>Invalid maps link. Please check and try again.</p>
              </div>
            )}
            <iframe
              src={getValue('maps')}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='rounded-lg'
              width='100%'
              height='100%'
            ></iframe>
          </div>
        </div>
      </div>
      <div>
        <h3 className='mb-3 font-bold text-text-secondary'>Social Media</h3>
        <div className='grid xs:grid-cols-2 items-center gap-x-5 gap-y-3'>
          {socials?.map((s) => formInputs[s.name.toLocaleLowerCase()])}
        </div>
      </div>
    </ModalFormLayout>
  );
}
