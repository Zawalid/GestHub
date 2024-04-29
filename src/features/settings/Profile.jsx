import { ProfileAvatar } from './ProfileAvatar';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useUpdateAvatar, useUpdateProfile, useUser } from '@/hooks/useUser';
import { RULES } from '@/utils/constants';

export default function Profile() {
  const { user } = useUser();
  const { mutate } = useUpdateProfile();
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const {
    Form,
    options: { isUpdated, isValid, dirtyFields, handleSubmit, reset, setValue, getValue },
  } = useForm({
    defaultValues: {
      avatar: user?.avatar || { src: null, file: null },
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      // Conditionally : if the user is and intern/user
      ...(['intern', 'user'].includes(user?.role) && {
        academicLevel: user?.academicLevel || '',
        establishment: user?.establishment || '',
      }),
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
          <ProfileAvatar
            avatar={getValue('avatar')}
            onChange={(avatar) => setValue('avatar', avatar)}
            disabled={isPending}
          />
        </div>

        {Form}
      </div>
    </ModalFormLayout>
  );
}
