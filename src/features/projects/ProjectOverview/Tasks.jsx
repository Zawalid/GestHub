import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast } from 'sonner';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaPlus } from '@/components/ui/Icons';
import { Button, Modal } from '@/components/ui';
import Task from '../Task';
import { useProject, useUpdateProject } from '../useProjects';
import { NewTask } from '../NewProject/StarterTasks';
import { getIncrementedID } from '@/utils/helpers';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.0001s`,
  };
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function Tasks() {
  const [parent] = useAutoAnimate({ duration: 400 });
  const { id } = useParams();
  const { project } = useProject(id);
  const [groups, setGroups] = useState(() => {
    const groups = { 'To Do': [], 'In Progress': [], Done: [] };
    project.tasks.forEach((task) => groups[task.status] && (groups[task.status] = [...groups[task.status], task]));
    return groups;
  });
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const { mutate } = useUpdateProject({ showToast: false });
  const { openModal } = useConfirmationModal();

  // Tasks Methods
  const updateGroups = (tasks, group, action) => {
    const newGroups = { ...groups, [group]: tasks };
    setGroups(newGroups);
    mutate(
      { id, data: { ...project, tasks: Object.values(newGroups).flat() } },
      {
        onSuccess: () => toast.success(`Task ${action}d successfully`),
        onError: () => toast.error(`Failed to ${action} task`),
      }
    );
  };
  const onAddTask = (task) => {
    const tasks = [
      ...project.tasks.filter((t) => t.status === task.status),
      { id: getIncrementedID(project.tasks), ...task },
    ];
    updateGroups(tasks, task.status, 'add');
  };
  const onUpdateTask = (task) => {
    const tasks = project.tasks.filter((t) => t.status === task.status).map((t) => (t.id === task.id ? task : t));
    updateGroups(tasks, task.status, 'update');
  };
  const onDeleteTask = (task) => {
    const tasks = [...project.tasks.filter((t) => t.status === task.status).filter((t) => t.id !== task.id)];
    openModal({
      message: 'Are you sure you want to delete this task ?',
      title: 'Delete Task',
      confirmText: 'Delete',
      onConfirm: () => updateGroups(tasks, task.status, 'delete'),
    });
  };

  // Drag And Drop Methods
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const { droppableId: sourceGroup, index: sourceIndex } = source;
    const { droppableId: destinationGroup, index: destinationIndex } = destination;

    if (sourceGroup === destinationGroup && sourceIndex === destinationIndex) return;
    // Clone the groups
    const newGroups = { ...groups };
    // Remove the task from one group and place it in the other
    const [movedTask] = newGroups[sourceGroup].splice(sourceIndex, 1);
    newGroups[destinationGroup].splice(destinationIndex, 0, { ...movedTask, status: destinationGroup });
    // Update the groups and database
    setGroups(newGroups);
    mutate({ id, data: { ...project, tasks: Object.values(newGroups).flat() } });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className='grid h-full w-full grid-cols-[repeat(3,100%)] gap-5 mobile:grid-cols-[repeat(3,minmax(300px,1fr))] '
        ref={parent}
      >
        {Object.keys(groups).map((group) => (
          <TasksGroup
            key={group}
            group={{
              name: group,
              tasks: groups[group],
              color: group === 'To Do' ? 'bg-red-500' : group === 'Done' ? 'bg-green-500' : 'bg-blue-500',
            }}
            onAdd={() => setCurrentGroup(group)}
            onEdit={(task) => setCurrentTask(task)}
            onDelete={onDeleteTask}
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
        onAdd={onAddTask}
        onUpdate={onUpdateTask}
      />
    </DragDropContext>
  );
}

function TasksGroup({ group, onAdd, onEdit, onDelete }) {
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <div className='flex flex-col gap-5 rounded-lg border border-border p-3' ref={parent}>
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

      <Droppable droppableId={group.name} type='TASK'>
        {(provided, snapshot) => (
          <div className='relative space-y-6 pt-2' ref={provided.innerRef} {...provided.droppableProps}>
            {snapshot.isDraggingOver ? (
              <div className='absolute z-10 h-[210px] w-full rounded-lg placeholder bg-background-secondary opacity-55'></div>
            ) : null}
            <TasksList group={group} onEdit={onEdit} onDelete={onDelete} isDragging={snapshot.isDraggingOver} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function TasksList({ group, onEdit, onDelete, isDragging }) {
  if (!group.tasks.length && !isDragging) {
    const message =
      group.name === 'To Do'
        ? 'No tasks to do. Feel free to add some!'
        : group.name === 'In Progress'
          ? 'No tasks in progress. Start working on something!'
          : 'No tasks marked as done. Complete some tasks to see them here!';

    return (
      <div className='grid mt-20 h-full place-content-center'>
        <p className='text-center text-sm font-medium text-text-secondary'>{message}</p>{' '}
      </div>
    );
  }
  return group.tasks.map((task, index) => (
    <Draggable key={`draggable-${task.id}`} draggableId={`draggable-${task.id}`} index={index} type='TASK'>
      {(provided, snapshot) => (
        <NaturalDragAnimation style={getStyle(provided.draggableProps.style, snapshot)} snapshot={snapshot}>
          {(style) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              <Task task={task} onEdit={onEdit} onDelete={onDelete} isDragging={snapshot.isDragging} />
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  ));
}

function AddNewTask({ currentGroup, onClose, currentTask, onAdd, onUpdate }) {
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
          onSubmit={(task) => (currentTask ? onUpdate(task) : onAdd(task))}
        />
      </div>
    </Modal>
  );
}
