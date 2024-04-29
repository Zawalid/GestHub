import { Button, Modal } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { useUploadFile } from '@/hooks/useUploadFile';
import { RULES } from '@/utils/constants';
import { LuUpload, IoTrashOutline, HiMiniXMark, FiCheck, BsSendFill } from '@/components/ui/Icons';
import { useUser } from '@/hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useOffer } from '../offers/useOffers';
import { useEffect } from 'react';
import { useAddDemand } from './useDemands';
import { ErrorTooltip } from '@/components/ui/InputField';

export default function NewDemand({ isOpen, onClose }) {
  const { mutate, isPending, error, isSuccess, reset } = useAddDemand({ showToast: false });
  const navigate = useNavigate();

  const render = () => {
    if (isPending) return <SendingApplication />;
    if (isSuccess) return <ApplicationSent />;
    if (error) return <ApplicationError onRetry={reset} />;
    return (
      <ApplicationForm
        onApply={mutate}
        onClose={onClose}
      onSuccess={(resetForm) => {
          onClose();
          resetForm();
          setTimeout(reset, 1000);
          navigate('/offers');
        }}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      className='min-h-[500px] overflow-auto p-5 md:h-fit md:w-[750px] md:border'
      closeOnBlur={false}
    >
      {render()}
    </Modal>
  );
}

function ApplicationForm({ onApply, onClose, onSuccess }) {
  const { id } = useParams();
  const { user } = useUser();
  const { offer } = useOffer(id);

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    offer: offer?.title,
    sector: offer?.sector,
    startDate: '',
    endDate: '',
    motivationLetter: '',
    CV: null,
    'Internship Application': null,
  };

  const {
    options: { formInputs, isUpdated, isValid, getValue, setValue, handleSubmit, reset, updateValues },
  } = useForm({
    defaultValues,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        readOnly: true,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        readOnly: true,
      },
      {
        name: 'offer',
        label: 'Offer',
        placeholder: 'Offer',
        readOnly: true,
      },
      {
        name: 'sector',
        label: 'Sector',
        placeholder: 'Sector',
        readOnly: true,
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
        rules: { ...RULES.endDate },
      },
      {
        name: 'motivationLetter',
        type: 'textarea',
        label: (
          <>
            Motivation Letter
            <span className='ml-1 text-xs font-normal text-text-secondary'>( Minimum 100 characters )</span>
          </>
        ),
        placeholder: 'Enter your motivation letter...',
        rows: '5',
        rules: { minLength: { value: 100, message: 'Motivation letter must be at least 100 characters' } },
      },
      {
        name: 'CV',
        hidden: true,
        rules: { required: false },
      },
      {
        name: 'Internship Application',
        hidden: true,
      },
    ],
    onSubmit: (data) => {
      const { startDate, endDate, motivationLetter, CV, ['Internship Application']: internshipApplication } = data;
      const demand = {
        user_id: user?.id,
        offer_id: id,
        startDate,
        endDate,
        motivationLetter,
        cv: CV.file,
        demandeStage: internshipApplication.file,
      };
      const formData = new FormData();

      for (const key in demand) {
        formData.append(key, demand[key]);
      }

      onApply(formData, { onSuccess: () => setTimeout(() => onSuccess(reset), 1000) });
    },
    gridLayout: true,
  });

  useEffect(() => {
    updateValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer.id]);

  return (
    <>
      <h1 className='mb-5 text-2xl font-bold text-text-primary'>Internship Application</h1>
      <div className='grid items-center gap-x-4 gap-y-2.5 sm:grid-cols-2'>
        {formInputs['firstName']}
        {formInputs['lastName']}
        {formInputs['offer']}
        {formInputs['sector']}
        {formInputs['startDate']}
        {formInputs['endDate']}
        {formInputs['motivationLetter']}
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-text-tertiary'>
            Papers
            <span className='ml-1 text-xs font-normal text-text-secondary'>
              ( Supports: .pdf, .doc, .docx. Max size: 5MB. )
            </span>
          </label>
          {['CV', 'Internship Application'].map((type) => (
            <File
              key={type}
              type={type}
              file={getValue(type)?.file || {}}
              onChange={(file) => setValue(type, file)}
              onDelete={() => setValue(type, null)}
              disabled={type === 'CV' && user?.cv}
            />
          ))}
        </div>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={() => reset(onClose)}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={!isUpdated || !isValid || (!user?.cv && !getValue('CV')?.file)}
          onClick={() => handleSubmit()}
        >
          Apply
        </Button>
      </div>
    </>
  );
}

function File({ type, file: { name, size }, onChange, onDelete, disabled }) {
  const { openFilePicker } = useUploadFile({
    onChange,
    options: {
      type,
      accept: ['.pdf', '.doc', '.docx'],
    },
  });

  return (
    <div
      className={`flex items-center gap-3 rounded-lg  px-3 py-1 ${disabled ? 'bg-background-disabled' : 'bg-background-secondary'}`}
    >
      <div className='relative h-12 w-12'>
        {['pdf', 'docx', 'doc'].map((fileType) => (
          <img
            key={fileType}
            src={`/images/.${fileType}.png`}
            alt={fileType}
            className={`absolute transition-transform duration-500 ${name?.split('.').at(-1) === fileType ? 'scale-100' : 'scale-0'}`}
          />
        ))}
        <img
          src={`/images/.add.png`}
          alt='add'
          className={`absolute transition-transform duration-500 ${name ? 'scale-0' : 'scale-100'}`}
        />
      </div>
      <div className='flex-1 space-y-0.5'>
        <h4 className='flex items-center gap-2 text-sm font-medium text-text-primary'>
          {name || type}
          {!name && !disabled && <ErrorTooltip message={`${type} is required`} />}
        </h4>
        <span className='text-xs text-text-secondary'>
          {disabled
            ? 'Already Provided'
            : size
              ? size / 1024 / 1024 < 1
                ? `${(size / 1024).toFixed(2)} KB`
                : `${(size / 1024 / 1024).toFixed(2)} MB`
              : 'No file uploaded'}{' '}
        </span>
      </div>
      <div className='flex gap-1.5'>
        <Button onClick={openFilePicker} shape='icon' color='secondary' size='small'>
          <LuUpload />
        </Button>
        <Button shape='icon' size='small' color='delete' disabled={!name} onClick={onDelete}>
          <IoTrashOutline />
        </Button>
      </div>
    </div>
  );
}

function SendingApplication() {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='mb-3 grid h-14 w-14 place-content-center rounded-full bg-blue-500 shadow-md'>
        <BsSendFill className='text-2xl text-white' />
      </div>
      <div className='mb-1 flex items-baseline gap-1'>
        <h2 className='text-lg font-bold text-text-primary sm:text-xl'>Sending Application</h2>
        <div className='sending'></div>
      </div>
      <p className='text-sm font-medium text-text-secondary'>Please wait while we process your request.</p>
    </div>
  );
}
function ApplicationSent() {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='mb-3 grid h-14 w-14 place-content-center rounded-full bg-green-500 shadow-md'>
        <FiCheck className='text-3xl text-white' />
      </div>
      <h2 className='mb-1 text-lg font-bold text-text-primary sm:text-xl'>Application Sent</h2>
      <p className='text-sm font-medium text-text-secondary'>Your application was sent successfully.</p>
    </div>
  );
}
function ApplicationError({ onRetry }) {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='grid h-14 w-14 place-content-center rounded-full bg-red-500 shadow-md'>
        <HiMiniXMark className='text-3xl text-white' />
      </div>
      <div className='my-3'>
        <h2 className='mb-1 text-lg font-bold text-text-primary sm:text-xl'>Failed To Send Application</h2>
        <p className='text-sm font-medium text-text-secondary'>An error occurred while sending your application</p>
      </div>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}
