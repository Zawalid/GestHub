import { getFilter, getIntervals } from '@/utils/helpers';
import { useUsers, useDeleteUser, useDeleteUsers } from './useUsers';
import { TableLayout } from '@/layouts/TableLayout';
import { LEVELS } from '@/utils/constants';
import { FaRegCircleCheck, FaRegCircleXmark, MdOutlinePendingActions } from '@/components/ui/Icons';

export default function UsersList() {
  const { users, isLoading, error } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: deleteUsers } = useDeleteUsers();

  return (
    <TableLayout
      data={users}
      resourceName='User'
      isLoading={isLoading}
      error={error}
      columns={[
        { key: 'id', displayLabel: 'ID', visible: false, type: 'number' },
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
          format: (val, id) => `${users?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
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
          filter: LEVELS.map((level) => ({ value: level, checked: false })),
        },
        {
          key: 'establishment',
          displayLabel: 'Establishment',
          visible: true,
          type: 'string',
          filter: getFilter(users, 'establishment'),
        },
        {
          key: 'created_at',
          displayLabel: 'Date Joined',
          visible: true,
          type: 'date',
          filter: getIntervals('created_at', ['present', 'past']),
        },
        {
          key: 'applications',
          displayLabel: 'Applications',
          visible: true,
          type: 'number',
          format: (val, id, isDownload) => {
            const values = {
              pending: val?.filter((p) => p.status === 'Pending')?.length,
              approved: val?.filter((p) => p.status === 'Approved')?.length,
              rejected: val?.filter((p) => p.status === 'Rejected')?.length,
            };
            return isDownload ? (
              `P : ${values.pending} | A : ${values.approved} | R : ${values.rejected}`
            ) : (
              <div className='flex w-fit gap-0.5 overflow-hidden rounded-lg'>
                {[
                  {
                    color: 'bg-orange-500',
                    icon: <MdOutlinePendingActions />,
                    value: values.pending,
                  },
                  {
                    color: 'bg-green-600',
                    icon: <FaRegCircleCheck />,
                    value: values.approved,
                  },
                  {
                    color: 'bg-red-500',
                    icon: <FaRegCircleXmark />,
                    value: values.rejected,
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
        },
      ]}
      fieldsToSearch={['firstName', 'lastName', 'email']}
      canView={false}
      downloadOptions={{
        csvFileName: 'Users',
        pdfFileName: 'Users',
      }}
      onDelete={deleteUser}
      selectedOptions={{
        deleteOptions: {
          resourceName: 'user',
          onConfirm: (ids) => deleteUsers(ids),
        },
      }}
      layoutOptions={{
        displayNewRecord: false,
        actions: (def) => [def.delete],
      }}
    />
  );
}
