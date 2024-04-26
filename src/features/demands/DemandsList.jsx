import { RULES } from '@/utils/constants';
import { useDemands, useDeleteDemand } from './useDemands';
import { TableLayout } from '@/layouts/TableLayout';
import { FaRegCircleCheck, FaRegCircleXmark, TbFileSearch } from '@/components/ui/Icons';

export default function DemandsList() {
  const { demands, isLoading, error } = useDemands();
  const { mutate: deleteDemand } = useDeleteDemand();

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
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
      ]}
      formDefaults={{
        firstName: '',
        lastName: '',
        email: '',
        startDate: '',
        endDate: '',
        offer: '',
      }}
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
            onClick: () => {},
          },
          {
            text: 'Approve',
            icon: <FaRegCircleCheck />,
            onClick: () => {},
          },
          {
            text: 'Reject',
            icon: <FaRegCircleXmark />,
            onClick: () => {},
          },
        ],
      }}
    />
  );
}
