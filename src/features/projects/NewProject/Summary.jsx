import { useForm } from '@/hooks/useForm';

export function Summary({ projectData }) {
  const {
    options: { formInputs },
  } = useForm({
    defaultValues: projectData['Basic Info'],
    fields: [
      {
        name: 'subject',
        label: 'Subject',
        showIcon: false,
        readOnly: true,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        rows: '9',
        showIcon: false,
        readOnly: true,
      },
      {
        name: 'supervisor',
        label: 'Supervisor',
        showIcon: false,
        readOnly: true,
        format: (val) => `${val?.firstName} ${val?.lastName}`,
      },
      {
        name: 'startDate',
        type: 'date',
        label: 'Start Date',
        showIcon: false,
        readOnly: true,
      },
      {
        name: 'endDate',
        type: 'date',
        label: 'End Date',
        showIcon: false,
        readOnly: true,
      },
    ],
  });

  const teamMembers = projectData['Team Members'];
  const tasks = projectData['Starter Tasks'];

  return (
    <div className='flex h-full flex-col pr-2 '>
      <h2 className='mb-2 text-center text-xl font-bold text-text-primary'>Finishing Up</h2>
      <p className='text-center text-sm font-medium text-text-tertiary'>
        Double-check everything looks OK before confirming
      </p>
      <div className='mt-8 flex flex-col gap-5 mobile:flex-row '>
        <div className='flex flex-1 flex-col gap-5'>
          {formInputs['subject']}
          {formInputs['description']}
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Priority</label>
            <button className='cursor-auto items-center justify-between rounded-lg border border-border p-2 text-start  text-sm text-text-secondary bg-background-disabled'>
              {projectData['Basic Info'].priority}
            </button>
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-5'>
          {formInputs['startDate']}
          {formInputs['endDate']}
          {formInputs['supervisor']}
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Team Members</label>
            <button className='cursor-auto items-center justify-between rounded-lg border border-border p-2 text-start  text-sm text-text-secondary bg-background-disabled'>
              {teamMembers.length > 0 ? `${teamMembers.map((t) => t.fullName).join(' | ')}` : 'No team assembled'}
            </button>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Tasks</label>
            <button className='cursor-auto items-center justify-between rounded-lg border border-border p-2 text-start  text-sm text-text-secondary bg-background-disabled'>
              {tasks.length > 0 ? `${tasks.length} task${tasks.length > 1 ? 's' : ''} added` : 'No tasks added'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
