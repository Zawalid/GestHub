import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import {  useUser } from '@/hooks/useUser';
import { File } from '../applications/NewApplication';
import { AcademicLevel } from '@/pages/auth/Register';
import { useState } from 'react';
import { FileView } from '@/components/ui/FileView';
import { useUploadFile } from '@/hooks/useUploadFile';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui';
import { HiMiniXMark } from 'react-icons/hi2';
import { useUpdateProfile } from './useSettings';

export default function Profile() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const { user } = useUser();
  const { mutate, isPending } = useUpdateProfile();

  const defaultValues = {
    avatar: user?.avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    // Conditionally : if the user is and intern/user
    ...(['intern', 'user'].includes(user?.role) && {
      academicLevel: user?.academicLevel,
      establishment: user?.establishment,
      cv: user?.cv,
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
      ...(['intern', 'user'].includes(user?.role)
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
                    file={getValue('cv')?.file}
                    onChange={(file) => setValue('cv', file)}
                    onDelete={() => setValue('cv', null)}
                    disabled={!getValue('cv')?.file}
                    onView={() => setIsCvOpen(true)}
                  />
                </div>
              ),
            },
          ]
        : []),
    ],
    onSubmit: () =>
      mutate({ user: dirtyFields, id: user?.profile_id }, { onError: () => reset(() => updateValues(defaultValues)) }),
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
        <ProfileAvatar
          avatar={getValue('avatar')}
          onChange={(avatar) => setValue('avatar', avatar)}
          disabled={isPending}
          role={user?.role}
        />

        {Form}
        <FileView isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} file={getValue('cv')?.src} />
      </div>
    </ModalFormLayout>
  );
}

function ProfileAvatar({ avatar, onChange, disabled, role }) {
  const { openFilePicker, options } = useUploadFile({ onChange });

  return (
    <div className='grid grid-cols-[7rem_auto] items-center gap-5'>
      <div className='relative'>
        <Avatar className='h-28 w-28' custom={{ avatar: avatar?.src, role }} />
        <Button
          shape='icon'
          color='red'
          size='small'
          className={`absolute -right-1 top-1 rounded-full text-base shadow-md transition-transform duration-300 ${disabled || !avatar?.src ? 'scale-0' : 'scale-100'}`}
          // disabled={disabled}
          onClick={() => onChange({ src: null, file: null })}
        >
          <HiMiniXMark />
        </Button>
      </div>
      <div>
        <Button
          type='outline'
          className='disabled:text-text-disabled disabled:hover:bg-background-disabled'
          disabled={disabled}
          onClick={openFilePicker}
        >
          Upload Avatar
        </Button>
        <p className='mb-1 mt-3 text-xs text-text-tertiary'>At least 80x80 px recommended.</p>
        <p className='text-xs text-text-tertiary'>
          {options.accept.map((type) => type.replace('.', '').toUpperCase()).join(', ')} are allowed (Max size of 5MB)
        </p>
      </div>
    </div>
  );
}
