import { useInterns, useAddIntern, useDeleteIntern, useUpdateIntern } from './useInterns';
import { TableLayout } from '@/layouts/TableLayout';

export default function InternsList() {
  const { interns, isLoading, error } = useInterns();
  const { mutate: addIntern } = useAddIntern();
  const { mutate: updateIntern } = useUpdateIntern();
  const { mutate: deleteIntern } = useDeleteIntern();

  return (
    <TableLayout
      data={interns}
      isLoading={isLoading}
      error={error}
      resourceName='Intern'
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
        {
          key: 'birthday',
          displayLabel: 'Birthday',
          visible: true,
          type: 'date',
        },
        {
          key: 'university',
          displayLabel: 'University',
          visible: true,
          type: 'string',
        },
        {
          key: 'major',
          displayLabel: 'Major',
          visible: true,
          type: 'string',
        },
        {
          key: 'startDate',
          displayLabel: 'Start Date',
          visible: true,
          type: 'date',
        },
        {
          key: 'endDate',
          displayLabel: 'End Date',
          visible: true,
          type: 'date',
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
          type : 'phone'
        },
        {
          name: 'birthday',
          label: 'Birthday',
          type: 'date',
        },
        {
          name: 'password',
          type: 'password',
          label: ' Password',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          label: 'Confirm  Password',
          rules: { validate: (pass, getValue) => pass === getValue('password') || "Passwords don't match" },
        },
      ]}
      formDefaults={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
      }}
      fieldsToSearch={['firstName', 'lastName', 'email', 'major', 'university']}
      downloadOptions={{
        csvFileName: 'Interns',
        pdfFileName: 'Interns',
      }}
      onAdd={addIntern}
      onUpdate={updateIntern}
      onDelete={deleteIntern}
    />
  );
}
