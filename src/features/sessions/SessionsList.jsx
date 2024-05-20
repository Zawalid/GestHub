import {  formatDate, getIntervals } from '@/utils/helpers';
import { useSessions, useDeleteSession,useDeleteSessions } from './useSessions';
import { TableLayout } from '@/layouts/TableLayout';

export default function SessionsList() {
  const { sessions, isLoading, error } = useSessions();
  const { mutate: deleteSession } = useDeleteSession();
  const { mutate: deleteSessions } = useDeleteSessions();

  return (
    <TableLayout
      data={sessions}
      resourceName='Session'
      isLoading={isLoading}
      error={error}
      columns={[
        {
          key: 'id',
          displayLabel: 'ID',
          visible: true,
          type: 'number',
        },
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
          format: (val, id) => `${sessions?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'location',
          displayLabel: 'Location',
          visible: true,
          type: 'string',
        },
        {
          key: 'ip',
          displayLabel: 'IP Address',
          visible: true,
          type: 'string',
        },
        {
          key: 'device',
          displayLabel: 'User Device',
          visible: true,
          type: 'string',
          format : (val) => val.slice(0,12) + '...'
        },
        {
          key: 'created_at',
          displayLabel: 'Signed In At',
          visible: true,
          type: 'date',
          format : (val) => formatDate(val,true),
          filter: getIntervals('created_at',['present','past']),
        },
        {
          key: 'status',
          displayLabel: 'Status',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            const colors = {  Online: 'bg-green-600', Offline: 'bg-red-500' };
            return isDownload ? (
              val
            ) : (
              <span className={`rounded-lg  px-2.5 py-1 text-white ${colors[val]}`}>{val}</span>
            );
          },
          filter: [
            { value: 'Online', checked: false },
            { value: 'Offline', checked: false },
          ],
        },
      ]}
      fieldsToSearch={['firstName', 'lastName', 'location']}
      canView={false}
      downloadOptions={{
        csvFileName: 'Sessions',
        pdfFileName: 'Sessions',
      }}
      onDelete={deleteSession}
      selectedOptions={{
        deleteOptions: {
          resourceName: 'session',
          onConfirm: (ids, setIsOperating) => deleteSessions(ids, { onSettled: () => setIsOperating(false) }),
        },
      }}
      layoutOptions={{
        displayNewRecord: false,
        actions: [],
      }}
    />
  );
}
