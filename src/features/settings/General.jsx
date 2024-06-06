import { useForm, useUploadFile } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/index';
import { socials } from '@/components/ui/SocialMedia';
import { useSettings, useUpdateSettings } from '@/hooks/useUser';
import { FaCamera } from 'react-icons/fa6';
import { GrMapLocation } from 'react-icons/gr';
import { ToolTip } from '@/components/ui';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export default function General() {
  const { settings } = useSettings();

  const defaultValues = {
    appLogo: settings?.appLogo,
    appName: settings?.appName,
    companyName: settings?.companyName,
    email: settings?.email,
    phone: settings?.phone,
    location: settings?.location,
    maps: settings?.maps,
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
        rules: { required: false },
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        rules: { required: false },
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'phone',
        rules: { required: false },
      },
      {
        name: 'location',
        label: 'Location ',
        type: 'location',
        rules: { required: false },
      },
      {
        name: 'maps',
        label: (
          <>
            <ToolTip
              content={
                <span className='text-xs text-text-secondary'>
                  To get the embed maps link from Google Maps, please watch this{' '}
                  <a
                    href='https://www.youtube.com/watch?v=R7m0e-7JCQk'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-bold text-secondary'
                  >
                    video
                  </a>
                  .
                </span>
              }
              interactive={true}
            >
              <span>
                <BsFillInfoCircleFill className='text-blue-500' />
              </span>
            </ToolTip>
            <label className='text-sm font-medium text-text-tertiary'>Embedded Google Maps</label>
          </>
        ),
        type: 'maps',
        placeholder: 'https://www.google.com/maps/embed?',
        rules: {
          pattern: {
            value: new RegExp(
              '^\\s*(https://www\\.google\\.com/maps/embed\\?|<iframe src="https://www\\.google\\.com/maps/embed\\?).*\\s*$',
              'i'
            ),
            message: 'Invalid URL. Please enter a valid Google Maps embed link.',
          },
          required: false,
        },
      },
      ...socials.map((s, i) => ({
        name: s.name.toLocaleLowerCase(),
        label: s.name,
        placeholder: s.href,
        ...(i === socials.length - 1 && { parentClassName: 'xs:col-span-2' }),
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
        formData.append(
          el,
          (() => {
            if (el === 'appLogo') return data[el].file;
            if (el === 'maps') return extractSrc(data[el]);
            return data[el] || '';
          })()
        );
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
        <div className='flex flex-col items-center gap-5 mobile:flex-row'>
          <div className='w-fit space-y-2'>
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
          <div className='grid w-full gap-5 xs:grid-cols-2'>
            {formInputs['appName']}
            {formInputs['companyName']}
            {formInputs['email']}
            {formInputs['phone']}
          </div>
        </div>
      </div>
      <div>
        <h3 className='mb-3 font-bold text-text-secondary'>Location</h3>
        <div className='grid items-center gap-5 sm:grid-cols-2'>
          <div className='space-y-3'>
            {formInputs['location']}
            {formInputs['maps']}
          </div>

          <div className='relative rounded-lg border border-border p-3'>
            {(errors?.['maps'] || !getValue('maps')) && (
              <div className='absolute left-0 top-0 grid h-full w-full place-content-center place-items-center gap-1.5 bg-background-secondary'>
                <GrMapLocation className='text-2xl' />
                <p className='text-xs font-medium text-text-tertiary'>Invalid maps link. Please check and try again.</p>
              </div>
            )}
            <iframe
              src={extractSrc(getValue('maps'))}
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
        <div className='grid items-center gap-x-5 gap-y-3 xs:grid-cols-2'>
          {socials?.map((s) => formInputs[s.name.toLocaleLowerCase()])}
        </div>
      </div>
    </ModalFormLayout>
  );
}

const extractSrc = (input) => {
  if (!input) return null;
  const iframeMatch = input.match(/<iframe.*?src="(.*?)".*?<\/iframe>/);
  return iframeMatch ? iframeMatch[1] : input;
};
