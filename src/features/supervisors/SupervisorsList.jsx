import { RULES } from '@/utils/constants';
import { useSupervisors, useAddSupervisor, useDeleteSupervisor, useUpdateSupervisor } from './useSupervisors';
import { TableLayout } from '@/layouts/TableLayout';
import { Gender } from '@/pages/auth/Register';

export default function SupervisorsList() {
  const { supervisors, isLoading, error } = useSupervisors();
  const { mutate: addSupervisor } = useAddSupervisor();
  const { mutate: updateSupervisor } = useUpdateSupervisor();
  const { mutate: deleteSupervisor } = useDeleteSupervisor();

  return (
    <TableLayout
      data={supervisors}
      resourceName='Supervisor'
      isLoading={isLoading}
      error={error}
      columns={[
        { key: 'id', displayLabel: 'ID', visible: true, type: 'number' },
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
          format: (val, id) => `${supervisors?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
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
        csvFileName: 'Supervisors',
        pdfFileName: 'Supervisors',
      }}
      onAdd={addSupervisor}
      onUpdate={updateSupervisor}
      onDelete={deleteSupervisor}
    />
  );
}
