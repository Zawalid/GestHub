import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/operations/Operations';
import NewProject from '@/features/projects/NewProject/NewProject';
import ProjectsList from '@/features/projects/ProjectsList';
import { useProjects } from '@/features/projects/useProjects';
import { useUser } from '@/hooks/useUser';

export function Projects() {
  const { projects, isLoading, error } = useProjects();
  const { user } = useUser();

  return (
    <Operations
      data={projects}
      isLoading={isLoading}
      error={error}
      sortOptions={[
        { key: 'created_at', display: 'Creation Date', type: 'date' },
        { key: 'updated_at', display: 'Update Date', type: 'date' },
        { key: 'subject', display: 'Subject', type: 'string' },
        { key: 'startDate', display: 'Start Date', type: 'date' },
        { key: 'endDate', display: 'End Date', type: 'date' },
        { key: 'tasksNumber', display: 'Tasks Number', type: 'number' },
        { key: 'teamCount', display: 'Members Number', type: 'number' },
        { key: 'progress', display: 'Progress', type: 'number' },
      ]}
      defaultSortBy='updated_at'
      defaultDirection='asc'
      filters={{
        status: [
          { value: 'Not Started', checked: false },
          { value: 'In Progress', checked: false },
          { value: 'Completed', checked: false },
        ],
        priority: [
          { value: 'Low', checked: false },
          { value: 'Medium', checked: false },
          { value: 'High', checked: false },
        ],
      }}
      defaultLayout='grid'
      fieldsToSearch={['subject']}
    >
      <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
        <Heading count={projects?.length}>Projects</Heading>
        <Operations.Search />
      </div>
      <ProjectsList />
      {['admin', 'super-admin'].includes(user?.role) && <NewProject />}
    </Operations>
  );
}

