import {
  useDeleteApplication,
  useApproveApplication,
  useRejectApplication,
  useApplications,
  useApproveApplications,
  useRejectApplications,
  useDeleteApplications,
} from './useApplications';
import { TableLayout } from '@/layouts/TableLayout';
import { FaRegCircleCheck, FaRegCircleXmark, TbFileSearch } from '@/components/ui/Icons';
import { useNavigateState, useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { getFilter, getIntervals } from '@/utils/helpers';

export default function ApplicationsList() {
  const { applications, isLoading, error } = useApplications();
  const { mutate: deleteApplication } = useDeleteApplication();
  const { mutate: deleteApplications } = useDeleteApplications();
  const { approve } = useApproveApplication();
  const { approve: approveMultiple } = useApproveApplications();
  const { reject } = useRejectApplication();
  const { reject: rejectMultiple } = useRejectApplications();

  const navigate = useNavigateWithQuery();
  const state = useNavigateState();

  return (
    <TableLayout
      data={applications}
      isLoading={isLoading}
      error={error}
      resourceName='Application'
      columns={[
        { key: 'id', displayLabel: 'ID', visible: true, type: 'number' },
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
          format: (val, id) => `${applications?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'offer',
          displayLabel: 'Offer',
          visible: true,
          type: 'string',
          filter: getFilter(applications, 'offer', state?.filter),
        },
        {
          key: 'sector',
          displayLabel: 'Sector',
          visible: true,
          type: 'string',
          filter: getFilter(applications, 'sector'),
        },
        {
          key: 'startDate',
          displayLabel: 'Start Date',
          visible: true,
          type: 'date',
          filter: getIntervals('startDate'),
        },
        {
          key: 'endDate',
          displayLabel: 'End Date',
          visible: true,
          type: 'date',
          filter: getIntervals('endDate'),
        },
        {
          key: 'status',
          displayLabel: 'Status',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            const colors = { Pending: 'bg-orange-500', Approved: 'bg-green-600', Rejected: 'bg-red-500' };
            return isDownload ? (
              val
            ) : (
              <span className={`rounded-lg  px-2.5 py-1 text-white ${colors[val]}`}>{val}</span>
            );
          },
          filter: [
            { value: 'Pending', checked: state?.filter === 'Pending' },
            { value: 'Approved', checked: false },
            { value: 'Rejected', checked: false },
          ],
        },
        {
          key: 'created_at',
          displayLabel: 'Application Date',
          visible: true,
          type: 'date',
          filter: getIntervals('created_at', ['past', 'present']),
        },
      ]}
      fieldsToSearch={['firstName', 'lastName', 'email', 'offer', 'sector']}
      downloadOptions={{
        csvFileName: 'Applications',
        pdfFileName: 'Applications',
      }}
      onDelete={deleteApplication}
      layoutOptions={{
        displayNewRecord: false,
        displayTableRecord: false,
        actions: [
          {
            text: 'Review',
            icon: <TbFileSearch />,
            onClick: (id) => navigate(`/app/applications/${id}`, { state: { source: '/app/applications' } }),
          },
          {
            text: 'Approve',
            icon: <FaRegCircleCheck />,
            onClick: (id) => approve(id),
            hidden: (application) => application?.status !== 'Pending',
          },
          {
            text: 'Reject',
            icon: <FaRegCircleXmark />,
            onClick: (id) => reject(id),
            hidden: (application) => application?.status !== 'Pending',
          },
        ],
      }}
      selectedOptions={{
        actions: [
          ...[
            { text: 'Approve', onClick: approveMultiple, color: 'green' },
            { text: 'Reject', onClick: rejectMultiple, color: 'orange' },
          ].map((el) => ({
            ...el,
            onClick: (ids, onClose, setIsOperating) => {
              el.onClick(ids, { onConfirm: () => setIsOperating(true), onSettled: () => setIsOperating(false) });
              onClose();
            },
            disabledCondition: (ids, data) => data?.some((app) => ids.includes(app.id) && app.status !== 'Pending'),
            message: (data) =>
              data.length === 1
                ? 'This application has already been processed.'
                : 'Some of these applications have already been processed.',
          })),
        ],
        deleteOptions: {
          resourceName: 'application',
          onConfirm: (ids, setIsOperating) => deleteApplications(ids, { onSettled: () => setIsOperating(false) }),
        },
      }}
    />
  );
}
