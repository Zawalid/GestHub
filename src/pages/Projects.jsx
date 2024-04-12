import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/operations/Operations';
import NewProject from '@/features/projects/NewProject/NewProject';
import ProjectsList from '@/features/projects/ProjectsList';
import { useProjects } from '@/features/projects/useProjects';
import { useState } from 'react';

export function Projects() {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const { projects, isLoading, error } = useProjects();

  const updateProjects = () => {
    return projects?.map((p) => {
      const completedTasks = p.tasks.filter((task) => task.status === 'Completed');
      const progress = (completedTasks.length / p.tasks.length) * 100;
      return {
        ...p,
        tasksNumber: p.tasks.length,
        membersNumber: p.teamMembers.length,
        progress,
      };
    });
  };

  return (
    <Operations
      data={updateProjects()}
      isLoading={isLoading}
      error={error}
      sortOptions={[
        { key: 'name', display: 'Name', type: 'string' },
        { key: 'startDate', display: 'Start Date', type: 'date' },
        { key: 'endDate', display: 'End Date', type: 'date' },
        { key: 'tasksNumber', display: 'Tasks Number', type: 'number' },
        { key: 'membersNumber', display: 'Members Number', type: 'number' },
        { key: 'progress', display: 'Progress', type: 'number' },
      ]}
      defaultSortBy="startDate"
      defaultDirection="asc"
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
      defaultLayout="grid"
      fieldsToSearch={['name']}
    >
      <div className="flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center">
        <Heading>Projects</Heading>
        <Operations.Search />
      </div>
      <ProjectsList onAddNewProject={() => setIsNewProjectOpen(true)} />
      <NewProject isOpen={isNewProjectOpen} onClose={() => setIsNewProjectOpen(false)} />
    </Operations>
  );
}
