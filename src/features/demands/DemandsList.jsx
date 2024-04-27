import { useNavigate } from 'react-router-dom';
import { useDemands, useDeleteDemand, useApproveDemand, useRejectDemand } from './useDemands';
import { TableLayout } from '@/layouts/TableLayout';
import { FaRegCircleCheck, FaRegCircleXmark, TbFileSearch } from '@/components/ui/Icons';

export default function DemandsList() {
  const { demands, isLoading, error } = useDemands();
  const { mutate: deleteDemand } = useDeleteDemand();
  const { approve } = useApproveDemand();
  const { reject } = useRejectDemand();

  const navigate = useNavigate();

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
      ]}
      fieldsToSearch={['firstName', 'lastName', 'email', 'offer']}
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
          },
          {
            text: 'Reject',
            icon: <FaRegCircleXmark />,
            onClick: (id) => reject(id),
          },
        ],
      }}
    />
  );
}
