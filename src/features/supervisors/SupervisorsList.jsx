import { RULES } from '@/utils/constants';
import { useSupervisors, useAddSupervisor, useDeleteSupervisor, useUpdateSupervisor } from './useSupervisors';
import { TableLayout } from '@/layouts/TableLayout';

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
        csvFileName: 'Supervisors',
        pdfFileName: 'Supervisors',
      }}
      onAdd={addSupervisor}
      onUpdate={updateSupervisor}
      onDelete={deleteSupervisor}
    />
  );
}
