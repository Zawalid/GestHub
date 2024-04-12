import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';

export default function Password() {
  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    fields: [
      {
        name: 'currentPassword',
        type: 'password',
        label: 'Current Password',
      },
      {
        name: 'newPassword',
        type: 'password',
        label: 'New Password',
      },
      {
        name: 'confirmNewPassword',
        type: 'password',
        label: 'Confirm New Password',
        rules: { validate: (pass, getValue) => pass === getValue('newPassword') || "Passwords don't match" },
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: false,
  });

  return (
    <ModalFormLayout
      submitButton={{
        text: 'Change Password',
        onClick: handleSubmit,
        disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      {Form}{' '}
    </ModalFormLayout>
  );
}
