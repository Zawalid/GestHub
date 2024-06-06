import { useForm, useNavigateWithQuery } from '@/hooks/index';
import { useEmail } from './useEmails';
import { useParams } from 'react-router-dom';
import { Modal, Status } from '@/components/ui';
import { useEffect } from 'react';

export default function Email() {
  const { id } = useParams();
  const { email, isLoading, error } = useEmail(id);
  const navigate = useNavigateWithQuery();

  const {
    options: { formInputs, updateValues },
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
        readOnly: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        readOnly: true,
      },
      {
        name: 'subject',
        label: 'Subject',
        readOnly: true,
      },
      {
        name: 'message',
        label: 'Message',
        readOnly: true,
        type: 'textarea',
        rows: '6',
        className: 'flex-1',
        parentClassName: 'flex-1',
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
  });

  useEffect(() => {
    updateValues(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email?.id]);

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
      <div className='flex flex-1 flex-col gap-3'>
        <div className='grid xs:grid-cols-2 gap-3'>
          {formInputs['fullName']}
          {formInputs['email']}
        </div>
        {formInputs['subject']}
        {formInputs['message']}
      </div>
    );
  };

  return (
    <Modal
      isOpen={location.pathname.includes('/emails') && id}
      className='relative min-h-[400px] overflow-auto p-5 sm:h-fit md:max-h-[600px] md:w-[650px] md:border'
      closeOnBlur={true}
      closeButton={false}
      onClose={() => navigate('/app/emails')}
    >
      {render()}
    </Modal>
  );
}
