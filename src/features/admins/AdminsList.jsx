import { RULES } from '@/utils/constants';
import { useAdmins, useAddAdmin, useDeleteAdmin, useUpdateAdmin, useDeleteAdmins } from './useAdmins';
import { TableLayout } from '@/layouts/TableLayout';
import { Gender } from '@/pages/auth/Register';

export default function AdminsList() {
  const { admins, isLoading, error } = useAdmins();
  const { mutate: addAdmin } = useAddAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin();
  const { mutate: deleteAdmins } = useDeleteAdmins();

  return (
    <TableLayout
      data={admins}
      resourceName='Admin'
      isLoading={isLoading}
      error={error}
      columns={[
        { key: 'id', displayLabel: 'ID', visible: false, type: 'number' },
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
          format: (val, id) => `${admins?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
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
          name: 'gender',
          customComponent: <Gender className='col-span-2' />,
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
        },
        {
          name: 'password_confirmation',
          type: 'password',
          label: 'Confirm Password',
          rules: { ...RULES.passwordConfirmation },
        },
      ]}
      formDefaults={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: 'M',
        password: '',
        password_confirmation: '',
      }}
      fieldsToSearch={['firstName', 'lastName', 'email']}
      canView={false}
      downloadOptions={{
        csvFileName: 'Admins',
        pdfFileName: 'Admins',
      }}
      onAdd={addAdmin}
      onUpdate={updateAdmin}
      onDelete={deleteAdmin}
      layoutOptions={{ actions: (def) => [def.edit, def.delete] }}
      selectedOptions={{
        deleteOptions: {
          resourceName: 'admin',
          onConfirm: (ids) => deleteAdmins(ids),
        },
      }}
    />
  );
}
