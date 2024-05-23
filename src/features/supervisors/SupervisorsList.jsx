import { RULES } from '@/utils/constants';
import {
  useSupervisors,
  useAddSupervisor,
  useDeleteSupervisor,
  useUpdateSupervisor,
  useDeleteSupervisors,
} from './useSupervisors';
import { TableLayout } from '@/layouts/TableLayout';
import { Gender } from '@/pages/auth/Register';
import { TbProgressCheck, FaCalendarXmark, FaRegCircleCheck } from '@/components/ui/Icons';

export default function SupervisorsList() {
  const { supervisors, isLoading, error } = useSupervisors();
  const { mutate: addSupervisor } = useAddSupervisor();
  const { mutate: updateSupervisor } = useUpdateSupervisor();
  const { mutate: deleteSupervisor } = useDeleteSupervisor();
  const { mutate: deleteSupervisors } = useDeleteSupervisors();

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
        { ...renderProjects },
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
     
      layoutOptions={{ actions: (def) => [def.edit, def.delete] }}
      selectedOptions={{
        deleteOptions: {
          resourceName: 'supervisor',
          onConfirm: (ids, setIsOperating) => deleteSupervisors(ids, { onSettled: () => setIsOperating(false) }),
        },
      }}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const renderProjects = {
  key: 'projects',
  displayLabel: 'Projects',
  visible: true,
  format: (val, id, isDownload) => {
    const values = {
      notStarted: val?.filter((p) => p.status === 'Not Started')?.length,
      inProgress: val?.filter((p) => p.status === 'In Progress')?.length,
      completed: val?.filter((p) => p.status === 'Completed')?.length,
      overdue: val?.filter((p) => p.status === 'Overdue')?.length,
    };
    return isDownload ? (
      `P : ${values.pending} | A : ${values.approved} | R : ${values.rejected}`
    ) : (
      <div className='flex w-fit gap-0.5 overflow-hidden rounded-lg'>
        {[
          {
            color: 'bg-gray-500',
            icon: <TbProgressCheck />,
            value: values.notStarted,
          },
          {
            color: 'bg-blue-500',
            icon: <TbProgressCheck />,
            value: values.inProgress,
          },
          {
            color: 'bg-green-600',
            icon: <FaRegCircleCheck />,
            value: values.completed,
          },
          {
            color: 'bg-red-500',
            icon: <FaCalendarXmark />,
            value: values.overdue,
          },
        ].map(({ color, icon, value }) => (
          <div key={color} className={`flex items-center gap-1 px-2.5 py-1 text-white ${color}`}>
            {icon}
            {value}
          </div>
        ))}
      </div>
    );
  },
  fn(a, b, direction) {
    return direction === 'asc' ? a?.projects.length - b?.projects.length : b?.projects.length - a?.projects.length;
  },
  type: 'custom',
};
