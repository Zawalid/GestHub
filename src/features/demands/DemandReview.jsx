import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Status } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { FaRegCircleCheck, FaRegCircleXmark, IoEyeOutline } from '@/components/ui/Icons';
import { useApproveDemand, useDemand, useRejectDemand } from './useDemands';
import { FileView } from '@/components/ui/FileView';

export default function DemandReview({ closeUrl }) {
  const { id } = useParams();
  const { demand, isLoading, error } = useDemand(id);
  const [currentFile, setCurrentFile] = useState(null);
  const { approve } = useApproveDemand();
  const { reject } = useRejectDemand();
  const navigate = useNavigate();

  const path = location.pathname;

  const {
    options: { formInputs, updateValues },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      offer: '',
      sector: '',
    },
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
        readOnly: true,
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
        readOnly: true,
      },
      {
        name: 'motivationLetter',
        type: 'textarea',
        label: 'Motivation Letter',
        readOnly: true,
        placeholder: 'Enter your motivation letter...',
        rows: '5',
      },
    ],
    gridLayout: true,
  });

  useEffect(() => {
    updateValues(demand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demand?.id]);

  const close = () => navigate(closeUrl);

  const render = () => {
    if (isLoading) return <Status status='loading' />;
    if (error) {
      return (
        <Status
          status='error'
          heading={error.message === 'Not found' && "Sorry, we couldn't find the offer you're looking for."}
          message={error.message === 'Not found' ? 'Please check the offer ID and try again.' : error.message}
        />
      );
    }
    return (
      <>
        {demand?.status === 'Approved' && (
          <div className='mb-5 flex w-fit items-center gap-2 rounded-lg bg-green-600 px-3 py-1'>
            <FaRegCircleCheck />
            <h2 className='text-sm font-medium'>Approved</h2>
          </div>
        )}
        {demand?.status === 'Refused' && (
          <div className='mb-5 flex w-fit items-center gap-2 rounded-lg bg-red-600 px-3 py-1'>
            <FaRegCircleXmark />
            <h2 className='text-sm font-medium'>Refused</h2>
          </div>
        )}
        <div className='grid items-center gap-x-4 gap-y-2.5 sm:grid-cols-2'>
          {formInputs['firstName']}
          {formInputs['lastName']}
          {formInputs['offer']}
          {formInputs['sector']}
          {formInputs['startDate']}
          {formInputs['endDate']}
          {formInputs['motivationLetter']}
          <div className='grid-cols- grid gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Papers</label>
            <File type='CV' file={demand?.cv} onOpen={() => setCurrentFile(demand.cv)} />
            <File
              type='Internship Application'
              file={demand?.demandeStage}
              onOpen={() => setCurrentFile(demand.demandeStage)}
            />
          </div>
        </div>
        {(demand?.status === 'Pending' && closeUrl !== '/applications') && (
          <div className='mt-5 grid grid-cols-2 gap-4'>
            <Button
              color='delete'
              display='with-icon'
              className='justify-center'
              onClick={() => reject(id, { onSuccess: close })}
            >
              <FaRegCircleXmark />
              Reject
            </Button>
            <Button
              display='with-icon'
              className='justify-center  bg-green-600 hover:bg-green-700'
              onClick={() => approve(id, { onSuccess: close })}
            >
              <FaRegCircleCheck />
              Approve
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        isOpen={(path.includes('/demands') || path.includes('/applications')) && id}
        className='relative min-h-[400px] overflow-auto p-5 sm:h-fit md:max-h-[600px] md:w-[650px] md:border'
        closeOnBlur={true}
        closeButton={false}
        onClose={close}
      >
        {render()}
      </Modal>
      <FileView isOpen={currentFile} onClose={() => setCurrentFile(null)} file={currentFile} />
    </>
  );
}

function File({ type, file, onOpen }) {
  return (
    <div className='flex items-center gap-3 rounded-lg  bg-background-secondary px-3 py-1'>
      <div className='relative h-12 w-12'>
        <img src={`/images/.add.png`} alt='add' />
      </div>
      <div className='flex-1 space-y-0.5'>
        <h4 className='flex items-center gap-2 text-sm font-medium text-text-primary'>{type}</h4>
        <span className='text-xs text-text-secondary'></span>
      </div>
      <div className='flex gap-1.5'>
        <Button shape='icon' size='small' color='secondary' onClick={onOpen} disabled={!file}>
          <IoEyeOutline />
        </Button>
      </div>
    </div>
  );
}
