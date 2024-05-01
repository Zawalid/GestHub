import { RULES } from '@/utils/constants';
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
          key: 'academicLevel',
          displayLabel: 'Academic Level',
          visible: true,
          type: 'string',
        },
        {
          key: 'establishment',
          displayLabel: 'Establishment',
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
          type: 'phone',
        },
        {
          name: 'academicLevel',
          label: 'Academic Level',
          type: 'academicLevel',
          rules: { ...RULES.academicLevel },
        },
        {
          name: 'establishment',
          label: 'Establishment',
          type: 'establishment',
        },
        {
          name: 'specialty',
          label: 'Specialty',
          type: 'specialty',
        },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          rules: { ...RULES.endDate },
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
        academicLevel: '',
        establishment: '',
        specialty: '',
        startDate: '',
        endDate: '',
        password: '',
        password_confirmation: '',
      }}
      fieldsToSearch={['firstName', 'lastName', 'email', 'academicLevel', 'establishment']}
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
