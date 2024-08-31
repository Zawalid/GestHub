import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Status } from '@/components/ui';
import { useForm, useNavigateWithQuery } from '@/hooks/index';
import { useEmail, useReplyToEmail } from './useEmails';
import { FaReply } from 'react-icons/fa';
import Editor, { useEditorOptions } from '@/components/shared/Editor/Editor';

export default function Email() {
  const { id } = useParams();
  const { email, isLoading, error } = useEmail(id);
  const navigate = useNavigateWithQuery();
  const [isOpen, setIsOpen] = useState(false);

  const {
    options: { formInputs, updateValues, values },
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

  const onClose = () => {
    navigate('/app/emails');
    setIsOpen(false);
  };

  const render = () => {
    if (isLoading || !values) return <Status status='loading' />;
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
        <div className='flex flex-1 flex-col gap-5 p-5'>
          <div className='flex flex-1 flex-col gap-3'>
            <div className='grid gap-3 xs:grid-cols-2'>
              {formInputs['fullName']}
              {formInputs['email']}
            </div>
            {formInputs['subject']}
            {formInputs['message']}
          </div>
          <Button display='with-icon' className='justify-center' onClick={() => setIsOpen(true)}>
            <FaReply />
            Reply
          </Button>
        </div>
        <Reply email={email?.email} isOpen={isOpen} onCancel={() => setIsOpen(false)} onClose={onClose} />
      </>
    );
  };

  return (
    <Modal
      isOpen={location.pathname.includes('/emails') && id}
      className='relative min-h-[400px] overflow-hidden sm:h-fit md:h-[450px] md:w-[650px] md:border'
      closeOnBlur={true}
      closeButton={false}
      onClose={onClose}
    >
      {render()}
    </Modal>
  );
}

function Reply({ email, isOpen, onCancel, onClose }) {
  const [subject, setSubject] = useState('Re: ');
  const { content: reply, setContent: setReply, isChanged, handleCancel, setEditorInstance } = useEditorOptions();
  const { mutate, isPending, error, isSuccess, reset } = useReplyToEmail();

  if (isPending) {
    return (
      <Status
        status='sending'
        heading='Sending Reply'
        message='Please wait while we process your request.
    '
      />
    );
  }
  if (isSuccess) {
    return <Status status='sent' heading='Reply Sent' message='Your reply was sent successfully.' />;
  }
  if (error) {
    return (
      <Status
        status='errorSending'
        heading='Failed To Send Reply'
        message='An error occurred while sending your reply.'
        onRetry={reset}
      />
    );
  }
  return (
    <div
      className={`absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-center gap-5 overflow-auto bg-background-primary p-5 transition-transform duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='flex flex-1 flex-col gap-3'>
        <div className='flex w-1/2 items-center gap-3'>
          <label className='text-sm font-semibold text-text-secondary'>To:</label>
          <input
            type='text'
            className='w-full border-b border-border bg-transparent pb-0.5 text-sm outline-none'
            value={email}
            readOnly={true}
          />
        </div>
        <div className='flex w-1/2 items-center gap-3 pb-3'>
          <label className='text-sm font-semibold text-text-secondary'>Subject:</label>
          <input
            type='text'
            className='w-full border-b border-border bg-transparent pb-0.5 text-sm outline-none'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <Editor
          content={reply.message}
          onUpdate={(text) => setReply(text)}
          size='small'
          className='flex-1'
          placeholder='Type your message here...'
          setEditorInstance={setEditorInstance}
          visibleButtons={[
            'bold',
            'italic',
            'strike',
            'underline',
            'link',
            'unlink',
            'text color',
            'headings',
            'bullets',
            'numbered',
            'horizontal rule',
            'align left',
            'align center',
            'align right',
          ]}
        />
      </div>
      <div className='flex justify-end gap-3'>
        <Button color='tertiary' onClick={() => handleCancel(onCancel)}>
          Cancel
        </Button>
        <Button
          disabled={!isChanged}
          onClick={() =>
            mutate({ email, subject, message: reply }, { onSuccess: () => setTimeout(() => onClose(), 3000) })
          }
        >
          Send Reply
        </Button>
      </div>
    </div>
  );
}
