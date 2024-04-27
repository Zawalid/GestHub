import { Button, Modal } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { useUploadFile } from '@/hooks/useUploadFile';
import { RULES } from '@/utils/constants';
import { LuUpload, IoTrashOutline } from '@/components/ui/Icons';
import { useUser } from '@/hooks/useUser';
import { useParams } from 'react-router-dom';
import { useOffer } from '../offers/useOffers';
import { useEffect } from 'react';

export default function NewDemand({ isOpen, onClose }) {
  const { user } = useUser();
  const { id } = useParams();
  const { offer } = useOffer(id);

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    offer: offer?.title,
    sector: offer?.sector,
    startDate: '',
    endDate: '',
    CV: null,
    Attestation: null,
    'Internship Application': null,
  };

  const {
    Form,
    options: { isUpdated, isValid, getValue, setValue, handleSubmit, reset, updateValues },
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
        name: 'cv',
        hidden: true,
      },
      {
        name: 'demandeStage',
        hidden: true,
      },
      {
        name: 'atestation',
        hidden: true,
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: true,
  });

  useEffect(() => {
    updateValues(defaultValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Modal
      isOpen={isOpen}
      className='min-h-[500px] overflow-auto p-5 md:h-fit  md:w-[650px] md:border'
      closeOnBlur={false}
    >
      <h1 className='mb-5 text-2xl font-bold text-text-primary'>Internship Application</h1>
      {Form}
      <div className='mt-2 space-y-3'>
        <label className='text-sm font-medium text-text-tertiary'>
          Papers
          <span className='ml-1 text-xs font-normal text-text-secondary'>
            ( Supports: .pdf, .doc, .docx. Max size: 5MB. )
          </span>
        </label>
        {['CV', 'Attestation', 'Internship Application'].map((type) => (
          <File
            key={type}
            type={type}
            file={getValue(type.toLowerCase())?.file || {}}
            onChange={(file) => setValue(type.toLowerCase(), file)}
            onDelete={() => setValue(type.toLowerCase(), null)}
          />
        ))}
      </div>
      <div className='mt-5 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={() => reset(onClose)}>
          Cancel
        </Button>
        <Button color='secondary' disabled={!isUpdated || !isValid} onClick={() => handleSubmit(onClose)}>
          Apply
        </Button>
      </div>
    </Modal>
  );
}

function File({ type, file: { name, size }, onChange, onDelete }) {
  const { openFilePicker } = useUploadFile({
    onChange,
    options: {
      type,
      accept: ['.pdf', '.doc', '.docx'],
    },
  });

  return (
    <div className='flex items-center gap-3 rounded-lg bg-background-secondary px-3 py-1'>
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
        <h4 className='text-sm font-medium text-text-primary'>{name || type}</h4>
        <span className='text-xs text-text-secondary'>
          {size
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
