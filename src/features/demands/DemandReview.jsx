import { Button, Modal, Status } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { FaRegCircleCheck, FaRegCircleXmark, IoEyeOutline, MdDownload } from '@/components/ui/Icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useApproveDemand, useDemand, useRejectDemand } from './useDemands';
import { useEffect } from 'react';

export default function DemandReview() {
  const { id } = useParams();
  const { demand, isLoading, error } = useDemand(id);
  const { approve } = useApproveDemand();
  const { reject } = useRejectDemand();
  const navigate = useNavigate();

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
        rows: '6',
      },
    ],
    gridLayout: true,
  });

  useEffect(() => {
    updateValues(demand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demand?.id]);

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
        <div className='grid items-center gap-x-4 gap-y-2.5 sm:grid-cols-2'>
          {formInputs['firstName']}
          {formInputs['lastName']}
          {formInputs['offer']}
          {formInputs['sector']}
          {formInputs['startDate']}
          {formInputs['endDate']}
          {formInputs['motivationLetter']}
          <div className='grid grid-cols-2 gap-3'>
            <File type='CV' />
            <File type='Internship Application' />
          </div>
        </div>
        <div className='mt-5 grid grid-cols-2 gap-4'>
          <Button color='delete' display='with-icon' className='justify-center' onClick={() => reject(id)}>
            <FaRegCircleXmark />
            Reject
          </Button>
          <Button color='secondary' display='with-icon' className='justify-center' onClick={() => approve(id)}>
            <FaRegCircleCheck />
            Approve
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal
      isOpen={location.pathname.includes('/demands') && id}
      className='relative min-h-[470px] overflow-auto p-5 md:h-fit md:max-h-[600px] md:w-[650px] md:border'
      closeOnBlur={false}
      closeButton={true}
      onClose={() => navigate('/app/demands')}
    >
      {render()}
    </Modal>
  );
}

function File({ type }) {
  return (
    <div className='space-y-1'>
      <label className='text-xs font-medium text-text-tertiary'>{type}</label>
      <div className='relative h-[140px] overflow-hidden rounded-lg border border-border bg-white shadow-md'>
        <div className='absolute flex h-full w-full bg-[url("/images/default-profile.jpg")] bg-cover blur-md'></div>
        <div className='absolute flex h-full w-full items-center justify-center gap-1'>
          <Button shape='icon' size='small'>
            <IoEyeOutline />
          </Button>
          <Button shape='icon' size='small'>
            <MdDownload />
          </Button>
        </div>
      </div>
    </div>
  );
}
