import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast } from 'sonner';
import { FaPlus } from '@/components/ui/Icons';
import { Button, Modal } from '@/components/ui';
import Task from '../Task';
import { useProject, useUpdateProject } from '../useProjects';
import { NewTask } from '../NewProject/StarterTasks';
import { getIncrementedID } from '@/utils/helpers';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

export default function Tasks() {
  const [parent] = useAutoAnimate({ duration: 400 });
  const { id } = useParams();
  const { project } = useProject(id);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const groups = useMemo(() => {
    const groups = { 'To Do': [], 'In Progress': [], Done: [] };
    project.tasks.forEach((task) => groups[task.status] && (groups[task.status] = [...groups[task.status], task]));
    return groups;
  }, [project?.tasks]);

  return (
    <>
      <div className='grid h-full grid-cols-[repeat(3,minmax(300px,1fr))] gap-6 xl:w-full ' ref={parent}>
        {Object.keys(groups).map((group) => (
          <TasksGroup
            key={group}
            group={{
              name: group,
              tasks: groups[group],
              color: group === 'To Do' ? 'bg-red-500' : group === 'Done' ? 'bg-green-500' : 'bg-blue-500',
            }}
            onAdd={() => setCurrentGroup(group)}
            onEdit={(id) => setCurrentTask(project.tasks.find((t) => t.id === id))}
            currentProject={{ id, project }}
          />
        ))}
      </div>
      <AddNewTask
        currentGroup={currentGroup}
        onClose={() => {
          setCurrentGroup(null);
          setCurrentTask(null);
        }}
        currentTask={currentTask}
        currentProject={{ id, project }}
      />
    </>
  );
}

function TasksGroup({ group, onAdd, onEdit, currentProject: { id, project } }) {
  const { mutate } = useUpdateProject({ showToast: false });
  const { openModal } = useConfirmationModal();
  const [parent] = useAutoAnimate({ duration: 400 });

  const onDelete = (taskId) => {
    openModal({
      message: 'Are you sure you want to delete this task ?',
      title: 'Delete Task',
      confirmText: 'Delete',
      onConfirm: () =>
        mutate(
          { id, data: { ...project, tasks: project.tasks.filter((t) => t.id !== taskId) } },
          {
            onSuccess: () => toast.success('Task deleted successfully'),
            onError: () => toast.error('Failed to delete task'),
          }
        ),
    });
  };

  const render = () => {
    if (!group.tasks.length) {
      const message =
        group.name === 'To Do'
          ? 'No tasks to do. Feel free to add some!'
          : group.name === 'In Progress'
            ? 'No tasks in progress. Start working on something!'
            : 'No tasks marked as done. Complete some tasks to see them here!';

      return (
        <div className='grid h-full place-content-center'>
          <p className='text-center text-sm font-medium text-text-secondary'>{message}</p>{' '}
        </div>
      );
    }
    return group.tasks.map((task) => <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />);
  };

  return (
    <div className='flex flex-col gap-5' ref={parent}>
      <div className='flex items-center justify-between rounded-lg bg-background-secondary px-3 py-2'>
        <div className='flex items-center gap-2'>
          <span className={`mt-[1px] rounded-full p-1 ${group.color}`}></span>
          <h5 className='mr-3 font-medium text-text-primary'>{group.name}</h5>
          <span className='rounded-lg border border-border bg-background-tertiary px-2 py-0.5 text-sm text-text-primary'>
            {group.tasks.length}
          </span>
        </div>
        <Button className='h-6 w-7' size='small' onClick={onAdd}>
          <FaPlus />
        </Button>
      </div>

      <div className='min-h-[250px] space-y-6' ref={parent}>
        {render()}
      </div>
    </div>
  );
}

function AddNewTask({ currentGroup, onClose, currentTask, currentProject: { id, project } }) {
  const { mutate } = useUpdateProject({ showToast: false });

  return (
    <Modal
      isOpen={currentGroup || currentTask}
      onClose={onClose}
      className='relative flex flex-col gap-4 p-5 sm:h-fit sm:w-[400px] sm:border'
      closeOnBlur={false}
    >
      <div className='flex h-full flex-col'>
        <NewTask
          status={currentGroup || currentTask?.status}
          currentTask={currentTask}
          onCancel={onClose}
          onSubmit={(task) =>
            mutate(
              {
                id,
                data: {
                  ...project,
                  tasks: currentTask
                    ? project.tasks.map((t) => (t.id === task.id ? task : t))
                    : [...project.tasks, { id: getIncrementedID(project.tasks), ...task }],
                },
              },
              {
                onSuccess: () => toast.success('Task updated successfully'),
                onError: () => toast.error('Failed to update task'),
              }
            )
          }
        />
      </div>
    </Modal>
  );
}
