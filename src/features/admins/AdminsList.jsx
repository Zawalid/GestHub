import { RULES } from '@/utils/constants';
import { useAdmins, useAddAdmin, useDeleteAdmin, useUpdateAdmin } from './useAdmins';
import { TableLayout } from '@/layouts/TableLayout';

export default function AdminsList() {
  const { admins, isLoading, error } = useAdmins();
  const { mutate: addAdmin } = useAddAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  return (
    <TableLayout
      data={admins}
      resourceName='Admin'
      isLoading={isLoading}
      error={error}
      columns={[
        { key: 'id', displayLabel: 'ID', visible: true, type: 'number' },
        {
          key: 'firstName',
          displayLabel: 'First Name',
          visible: true,
          type: 'string',
        },
        {
          key: 'lastName',
          displayLabel: 'Last Name',
          visible: true,
          type: 'string',
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'phone',
          displayLabel: 'Phone',
          visible: true,
          type: 'string',
        },
      ]}
      formFields={[
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
          name: 'password',
          type: 'password',
          label: 'Password',
          rules: { required: false },
        },
        {
          name: 'password_confirmation',
          type: 'password',
          label: 'Confirm Password',
          rules: { ...RULES.passwordConfirmation, required: false },
        },
      ]}
      formDefaults={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
      }}
      fieldsToSearch={['firstName', 'lastName', 'email']}
      downloadOptions={{
        csvFileName: 'Admins',
        pdfFileName: 'Admins',
      }}
      onAdd={addAdmin}
      onUpdate={updateAdmin}
      onDelete={deleteAdmin}
    />
  );
}
