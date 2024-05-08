import { useDeleteDemand, useApproveDemand, useRejectDemand } from './useDemands';
import { TableLayout } from '@/layouts/TableLayout';
import { FaRegCircleCheck, FaRegCircleXmark, TbFileSearch } from '@/components/ui/Icons';
import { Operations } from '@/components/shared/operations/Operations';
import { useOperations } from '@/components/shared/operations/useOperations';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export default function DemandsList() {
  const { data: demands, isLoading, error } = useOperations();
  const { mutate: deleteDemand } = useDeleteDemand();
  const { approve } = useApproveDemand();
  const { reject } = useRejectDemand();

  const navigate = useNavigateWithQuery();

  return (
    <TableLayout
      data={demands}
      isLoading={isLoading}
      error={error}
      resourceName='Demand'
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
        {
          key: 'offer',
          displayLabel: 'Offer',
          visible: true,
          type: 'string',
        },
        {
          key: 'sector',
          displayLabel: 'Sector',
          visible: true,
          type: 'string',
        },
        {
          key: 'status',
          displayLabel: 'Status',
          visible: true,
          type: 'string',
        },
        {
          key: 'created_at',
          displayLabel: 'Application Date',
          visible: true,
          type: 'date',
        },
      ]}
      fieldsToSearch={['firstName', 'lastName', 'email', 'offer','sector']}
      downloadOptions={{
        csvFileName: 'Demands',
        pdfFileName: 'Demands',
      }}
      onDelete={deleteDemand}
      layoutOptions={{
        displayNewRecord: false,
        displayTableRecord: false,
        actions: [
          {
            text: 'Review',
            icon: <TbFileSearch />,
            onClick: (id) => navigate(`/app/demands/${id}`),
          },
          {
            text: 'Approve',
            icon: <FaRegCircleCheck />,
            onClick: (id) => approve(id),
            hidden: (demand) => demand?.status !== 'Pending',
          },
          {
            text: 'Reject',
            icon: <FaRegCircleXmark />,
            onClick: (id) => reject(id),
            hidden: (demand) => demand?.status !== 'Pending',
          },
        ],
        filter: <Operations.Filter />,
      }}
    />
  );
}
