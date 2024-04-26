import { ProfileAvatar } from './ProfileAvatar';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useUpdateAvatar, useUpdateProfile, useUser } from '@/hooks/useUser';
import { RULES } from '@/utils/constants';

export default function Profile() {
  const { user } = useUser();
  const { mutate } = useUpdateProfile();
  const { mutate: updateAvatar } = useUpdateAvatar();

  const defaultUser = {
    avatar: { src: null, file: null },
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Conditionally : if the user is and intern/user
    ...(['intern', 'user'].includes(user?.role) && {
      academicLevel: '',
      establishment: '',
    }),
  };

  const {
    Form,
    options: { isUpdated, isValid, dirtyFields, handleSubmit, reset, setValue, getValue },
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
      ...(['intern', 'user'].includes(user?.role)
        ? [
            {
              name: 'academicLevel',
              type: 'academicLevel',
              label: 'Academic Level',
              rules: { ...RULES.academicLevel },
            },
            {
              name: 'establishment',
              type: 'establishment',
              label: 'Establishment',
            },
          ]
        : []),
    ],
    onSubmit: (user) => {
      if (dirtyFields['avatar']) updateAvatar({ id: user.profile_id, file: user.avatar.file });
      if (Object.keys(dirtyFields).length === 1 && Object.keys(dirtyFields)[0] === 'avatar') return;
      mutate({ user, id: user.profile_id });
    },
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
          <ProfileAvatar avatar={getValue('avatar')} onChange={(avatar) => setValue('avatar', avatar)} />
        </div>

        {Form}
      </div>
    </ModalFormLayout>
  );
}
