import { ProfileImage } from './ProfileImage';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts';
import { useUser } from '@/hooks/useUser';

export default function Profile() {
  const { user } = useUser();

  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset, setValue, getValue },
  } = useForm({
    defaultValues: {
      image: user?.avatar || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthday: user?.birthday || '',
    },
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
      },
      {
        name: 'lastName',
        label: 'Last Name',
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
        name: 'birthday',
        type: 'date',
        label: 'Birthday',
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: true,
  });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      <div className='space-y-5'>
        <div>
          <h3 className='mb-3 font-bold text-text-secondary'>Image</h3>
          <ProfileImage image={getValue('image')} onChange={(image) => setValue('image', image)} />
        </div>

        {Form}
      </div>
    </ModalFormLayout>
  );
}
