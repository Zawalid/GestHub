import { ProfileAvatar } from './ProfileAvatar';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useUpdateProfile, useUser } from '@/hooks/useUser';
import { File } from '../applications/NewApplication';
import { AcademicLevel } from '@/pages/auth/Register';
import { useState } from 'react';
import { FileView } from '@/components/ui/FileView';

export default function Profile() {
  const [isCvOpen,setIsCvOpen] = useState(false)
  const { user } = useUser();
  const { mutate, isPending } = useUpdateProfile();

  const { profile_id, role, avatar, firstName, lastName, email, phone, academicLevel, establishment, cv } = user || {};

  const defaultValues = {
    avatar: avatar || { src: null, file: null },
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phone: phone || '',
    // Conditionally : if the user is and intern/user
    ...(['intern', 'user'].includes(role) && {
      academicLevel: academicLevel || '',
      establishment: establishment || '',
      cv: cv || '',
    }),
  };

  const {
    Form,
    options: { isUpdated, dirtyFields, handleSubmit, reset, setValue, getValue, updateValues },
  } = useForm({
    defaultValues,
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
      ...(['intern', 'user'].includes(role)
        ? [
            {
              name: 'academicLevel',
              customComponent: <AcademicLevel />,
            },
            {
              name: 'establishment',
              type: 'establishment',
              label: 'Establishment',
            },
            {
              name: 'cv',
              customComponent: () => (
                <div className='col-span-2 space-y-1.5'>
                  <label className='text-sm font-medium text-text-tertiary'>
                    Cv
                    <span className='ml-1 text-xs font-normal text-text-secondary'>
                      ( Supports: .pdf, .doc, .docx. Max size: 5MB. )
                    </span>
                  </label>

                  <File
                    type={'Cv'}
                    file={getValue('cv')?.file || {}}
                    onChange={(file) => setValue('cv', file)}
                    onDelete={() => setValue('cv', null)}
                    onView={() => setIsCvOpen(true)}
                  />
                </div>
              ),
            },
          ]
        : []),
    ],
    onSubmit: () =>
      mutate({ user: dirtyFields, id: profile_id }, { onError: () => reset(() => updateValues(defaultValues)) }),
    gridLayout: true,
  });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      <div className='space-y-5'>
        <div>
          <ProfileAvatar
            avatar={getValue('avatar')}
            onChange={(avatar) => setValue('avatar', avatar)}
            disabled={isPending}
            role={user?.role}
          />
        </div>

        {Form}
        <FileView isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} file={getValue('cv')?.src} />

      </div>
    </ModalFormLayout>
  );
}
