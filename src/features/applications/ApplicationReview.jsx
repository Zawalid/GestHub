import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Status } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { FaRegCircleCheck, FaRegCircleXmark, IoEyeOutline, MdOutlinePendingActions } from '@/components/ui/Icons';
import { useApproveApplication, useApplication, useRejectApplication } from './useApplications';
import { FileView } from '@/components/ui/FileView';
import { useNavigateState, useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { formatDate } from '@/utils/helpers';

export default function ApplicationReview() {
  const { id } = useParams();
  const { application, isLoading, error } = useApplication(id);
  const [currentFile, setCurrentFile] = useState(null);
  const { approve } = useApproveApplication();
  const { reject } = useRejectApplication();
  const navigate = useNavigateWithQuery();
  const source =
    useNavigateState()?.source || (location.pathname.includes('/app/') ? '/app/applications' : '/applications');

  const currentStatus = [
    {
      status: 'Pending',
      color: 'bg-orange-500',
      icon: <MdOutlinePendingActions />,
    },
    {
      status: 'Approved',
      color: 'bg-green-600',
      icon: <FaRegCircleCheck />,
    },
    {
      status: 'Rejected',
      color: 'bg-red-500',
      icon: <FaRegCircleXmark />,
    },
  ].find((s) => s.status === application?.status);

  const {
    options: { formInputs, updateValues },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      startDate: '',
      endDate: '',
      offer: '',
      sector: '',
    },
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        readOnly: true,
      },
      {
        name: 'email',
        label: 'Email',
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
    updateValues(application);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application?.id]);

  const close = () => navigate(source);

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
        <div className='mb-5 flex text-white items-center justify-between pt-5 md:pt-0'>
          <div className={`flex w-fit items-center gap-2 rounded-lg px-3 py-1 ${currentStatus?.color}`}>
            {currentStatus?.icon}
            <h3 className='text-sm font-medium'>{currentStatus?.status}</h3>
          </div>

          <span className='rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary'>
            {formatDate(application?.created_at, true)}
          </span>
        </div>
        <div className='grid items-center gap-x-4 gap-y-2.5 sm:grid-cols-2'>
          {formInputs['fullName']}
          {formInputs['email']}
          {formInputs['offer']}
          {formInputs['sector']}
          {formInputs['startDate']}
          {formInputs['endDate']}
          {formInputs['motivationLetter']}
          <div className='grid gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Documents</label>
            {[
              { type: 'CV', file: application?.cv },
              { type: 'Internship Application', file: application?.applicationStage },
            ].map(({ type, file }) => (
              <File key={type} type={type} file={file} onOpen={() => setCurrentFile(file)} />
            ))}
          </div>
        </div>
        {application?.status === 'Pending' && location.pathname.includes('/app/') && (
          <div className='mt-5 grid grid-cols-2 gap-4'>
            <Button
              color='red'
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
        isOpen={location.pathname.includes('/applications') && id}
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
        <img src={`/images/pdf.png`} alt='add' />
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
