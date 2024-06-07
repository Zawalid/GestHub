import {  formatDate, getIntervals } from '@/utils/helpers';
import { useEmails, useDeleteEmail, useDeleteEmails } from './useEmails';
import { TableLayout } from '@/layouts/TableLayout';

export default function EmailsList() {
  const { emails, isLoading, error } = useEmails();
  const { mutate: deleteEmail } = useDeleteEmail();
  const { mutate: deleteEmails } = useDeleteEmails();

  return (
    <TableLayout
      data={emails}
      resourceName='Email'
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
          format: (val, id) => `${emails?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'subject',
          displayLabel: 'Subject',
          visible: true,
          type: 'string',
          format : (val) => `${val.slice(0, 15)}${val.slice(10).length ? '...' : ''}`
        },
        {
          key: 'message',
          displayLabel: 'Message',
          visible: true,
          type: 'string',
          format : (val) => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`
        },
        {
          key: 'created_at',
          displayLabel: 'Sent Date',
          visible: true,
          type: 'date',
          format: (val) => formatDate(val, true),
          filter: getIntervals('created_at', ['present', 'past']),
        },
       
      ]}
      fieldsToSearch={['firstName', 'lastName', 'email']}
      downloadOptions={{
        csvFileName: 'Emails',
        pdfFileName: 'Emails',
      }}
      onDelete={deleteEmail}
     
      selectedOptions={{
        deleteOptions: {
          resourceName: 'email',
          onConfirm: (ids) => deleteEmails(ids, ),
        },
      }}
      layoutOptions={{
        displayNewRecord: false,
        actions: (def) => [def.delete],
      }}
    />
  );
}
