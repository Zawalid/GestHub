import { IoMail, BsTelephoneFill, IoLocationSharp, GrMapLocation } from '@/components/ui/Icons';
import { useSettings } from '@/features/settings/useSettings';
import { useForm } from '../hooks';
import { Button, Status } from '@/components/ui';
import { SocialMedia, isSet } from '@/components/ui/SocialMedia';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useContactUs } from '@/features/emails/useEmails';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';

export function Contact() {
  return (
    <div className='flex w-full flex-1 items-center gap-5 p-3 mobile:p-5 sm:gap-8 sm:p-8'>
      <Socials />
      <div className='grid flex-1 gap-x-5 gap-y-10 md:grid-cols-2'>
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
}

function Socials() {
  const { settings } = useSettings();

  if (!isSet(settings)) return null;

  return (
    <div className='flex flex-col items-center'>
      <h3 className='vertical text-xs font-medium uppercase text-text-tertiary'>Follow Us</h3>
      <div className='mb-5 h-20 w-0.5 bg-border'></div>
      <SocialMedia className='flex-col' size='small' />
    </div>
  );
}

function ContactForm() {
  const { mutate, isPending, error, isSuccess, reset } = useContactUs();
  const [parent] = useAutoAnimate({duration : 500});
  const {
    options: { formInputs, isValid, handleSubmit },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
      },
      {
        name: 'subject',
        label: 'Subject',
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        rows: '6',
        rules: {
          minLength: {
            value: 30,
            message: 'Your message must be at least 30 characters long',
          },
          maxLength: {
            value: 500,
            message: 'Your message must be no more than 500 characters long',
          },
        },
      },
    ],
    onSubmit: mutate,
  });

  const render = () => {
    if (isPending) {
      return <Status status='sending' heading='Sending Message' message='Please wait while we process your request.' />;
    }
    if (isSuccess) {
      return <Status status='sent' heading='Message Sent' message='Your message was sent successfully.' />;
    }
    if (error) {
      return (
        <Status
          status='errorSending'
          heading='Failed To Send Message'
          message='An error occurred while sending your message.'
          onRetry={reset}
        />
      );
    }
    return (
      <>
        <div className='space-y-3'>
          <h1 className='w-fit border-b-4 border-primary pb-1 text-2xl font-bold text-text-primary sm:text-3xl'>
            Contact Us
          </h1>
          <p className='text-wrap text-sm font-medium text-text-secondary'>
            Feel free to contact us any time. We&apos;ll get back to you as soon as we can!
          </p>
        </div>
        <div className='space-y-2'>
          <div className='grid gap-2 xs:grid-cols-2'>
            {formInputs['fullName']}
            {formInputs['email']}
          </div>
          {formInputs['subject']}
          {formInputs['message']}
        </div>
        <Button
          color='secondary'
          isLoading={isPending}
          disabled={!isValid}
          onClick={() => !isPending && handleSubmit(null, true)}
        >
          {isPending ? 'Sending' : 'Send'}
        </Button>
      </>
    );
  };

  return <div className='relative flex flex-col gap-5' ref={parent}>{render()}</div>;
}

function ContactInfo() {
  const { settings, isLoading } = useSettings();

  return (
    <div className='relative flex flex-1 flex-col gap-5 rounded-lg border border-border bg-background-secondary'>
      <img src='/SVG/contact.svg' alt='' className='-translate- absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2' />
      <div>
        <Info label='about.phone' isLoading={isLoading} value={settings?.phone} icon={<BsTelephoneFill />} />
        <Info label='about.email' isLoading={isLoading} value={settings?.email} icon={<IoMail />} />
        <Info label='about.location' isLoading={isLoading} value={settings?.location} icon={<IoLocationSharp />} />
      </div>

      {isLoading && (
        <div className='mx-5 mb-5 grid flex-1 animate-pulse place-content-center rounded-lg bg-background-tertiary text-4xl text-text-tertiary'>
          <GrMapLocation />
        </div>
      )}
      {!isLoading && settings?.maps && (
        <div className='min-h-[200px] flex-1 px-5 pb-5'>
          <iframe
            src={settings?.maps}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            width='100%'
            height='100%'
            className='rounded-xl'
          ></iframe>
        </div>
      )}
    </div>
  );
}

const Info = ({ isLoading, value, label, icon }) => {
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className='flex animate-pulse items-center gap-4 border-b border-border px-4 py-2'>
        <div className='h-10 w-10 rounded-full bg-background-tertiary'></div>
        <div className='flex-1 space-y-1.5'>
          <div className='h-2.5 w-20 bg-background-tertiary'></div>
          <div className='h-3 w-40 bg-background-tertiary'></div>
        </div>
      </div>
    );
  if (!value) return null;

  return (
    <div
      className='flex cursor-pointer items-center gap-4 border-b border-border px-4 py-3 transition-colors duration-300 hover:bg-background-tertiary'
      onClick={() => navigator.clipboard.writeText(value).then(() => toast.success(`${t(label)} copied successfully`))}
    >
      <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>{icon}</div>
      <div className='space-y-1'>
        <h3 className='text-xs font-medium text-text-secondary'> {t(label)}</h3>
        <h2 className='text-sm font-semibold text-text-primary '>{value}</h2>
      </div>
    </div>
  );
};
