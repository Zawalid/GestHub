import { ProfileImage } from './ProfileImage';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts';
import { useUser } from '@/hooks/useUser';

export default function Profile() {
  const { user } = useUser();
  const defaultUser = {
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Conditionally : if the user is and intern/user
    ...(['intern', 'user'].includes(user?.role) && {
      academicLevel: '',
      establishment: '',
      startDate: '',
      endDate: '',
    }),
  };

  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset, setValue, getValue },
  } = useForm({
    defaultValues: { ...defaultUser, ...user },
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
      // Conditionally : if the user is and intern/user
      ...(['intern', 'user'].includes(user?.role) ? [
        {
          name: 'academicLevel',
          type: 'academicLevel',
          label: 'Academic Level',
        },
        {
          name: 'establishment',
          type: 'establishment',
          label: 'Establishment',
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
        },
      ] : []),
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
