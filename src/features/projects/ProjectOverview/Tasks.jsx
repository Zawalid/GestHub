import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast } from 'sonner';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaPlus, PiListBold, RxViewVertical } from '@/components/ui/Icons';
import { Button, Modal } from '@/components/ui';
import Task from '../Task';
import { useProject, useUpdateProject } from '../useProjects';
import { NewTask } from '../NewProject/StarterTasks';
import { getIncrementedID } from '@/utils/helpers';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import { createPortal } from 'react-dom';
import { useUser } from '@/hooks/useUser';

const getStyle = (style, snapshot) => (snapshot.isDropAnimating ? { ...style, transitionDuration: `0.0001s` } : style);

export default function Tasks() {
  const [parent] = useAutoAnimate({ duration: 400 });
  const { id } = useParams();
  const { project } = useProject(id);
  const { user } = useUser();
  const [groups, setGroups] = useState(() => {
    const groups = { 'To Do': [], 'In Progress': [], Done: [] };
    project.tasks
      // .filter((task) => {
      //   if (user?.role === 'supervisor' || +user?.id === +project?.projectManager) return true;
      //   return task.assignee === 'None' || +task.assignee?.id === +user?.id;
      // })
      .forEach((task) => groups[task.status] && (groups[task.status] = [...groups[task.status], task]));
    return groups;
  });
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [layout, setLayout] = useState('board');
  const { mutate } = useUpdateProject({ showToast: false });
  const { openModal } = useConfirmationModal();

  const canManipulateTasks =
    user?.role === 'supervisor' || (user?.role === 'intern' && +user?.id === +project?.projectManager);

  // Project Methods
  const getProjectStatus = (tasks) => {
    const notStarted = tasks.every((task) => task.status === 'To Do');
    const isCompleted = tasks.every((task) => task.status === 'Done');
    const status = notStarted ? 'Not Started' : isCompleted ? 'Completed' : 'In Progress';
    return status;
  };
  const updateGroups = (groupTasks, group, action) => {
    const newGroups = { ...groups, [group]: groupTasks };
    const tasks = Object.values(newGroups).flat();

    setGroups(newGroups);
    mutate(
      { id, data: { ...project, tasks, status: getProjectStatus(tasks) } },
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
    const tasks = Object.values(newGroups).flat();
    // Update the groups and database
    setGroups(newGroups);
    mutate({ id, data: { ...project, tasks, status: getProjectStatus(tasks) } });
  };

  return (
    <div className='flex-1 overflow-auto pr-2'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className={` h-full w-full ${
            layout === 'board'
              ? 'grid  grid-cols-[repeat(3,100%)] gap-5 mobile:grid-cols-[repeat(3,minmax(300px,1fr))] '
              : 'flex flex-col gap-8'
          }`}
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
              layout={layout}
              canManipulateTasks={canManipulateTasks}
            />
          ))}
        </div>
        {canManipulateTasks && (
          <AddNewTask
            currentGroup={currentGroup}
            onClose={() => {
              setCurrentGroup(null);
              setCurrentTask(null);
            }}
            currentTask={currentTask}
            onAdd={onAddTask}
            onUpdate={onUpdateTask}
            teamMembers={project?.teamMembers}
          />
        )}
      </DragDropContext>
      {createPortal(
        <div className='flex justify-between gap-3'>
          <Button
            display='with-icon'
            size='small'
            color='tertiary'
            state={layout === 'board' ? 'active' : null}
            onClick={() => setLayout('board')}
          >
            <RxViewVertical />
            Board
          </Button>
          <Button
            display='with-icon'
            size='small'
            color='tertiary'
            state={layout === 'list' ? 'active' : null}
            onClick={() => setLayout('list')}
          >
            <PiListBold />
            List
          </Button>
        </div>,
        document.getElementById('tabs') || document.body
      )}
    </div>
  );
}

function TasksGroup({ group, onAdd, onEdit, onDelete, layout, canManipulateTasks }) {
  const [parent] = useAutoAnimate({ duration: 400 });

  const droppable = () => {
    return (
      <Droppable droppableId={group.name} type='TASK'>
        {(provided, snapshot) => (
          <div
            className={`relative flex flex-col ${layout === 'board' ? 'gap-6 pt-2' : 'flex-1 gap-3'}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {snapshot.isDraggingOver ? (
              <div
                className={`placeholder absolute z-10 w-full rounded-lg bg-background-secondary opacity-55 ${layout === 'board' ? ' h-[190px]' : 'h-10'}`}
              ></div>
            ) : null}
            <TasksList
              group={group}
              onEdit={onEdit}
              onDelete={onDelete}
              isDragging={snapshot.isDraggingOver}
              layout={layout}
              canManipulateTasks={canManipulateTasks}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  if (layout === 'list')
    return (
      <div className='flex flex-col gap-3 border-b border-border pb-3'>
        <div className='grid grid-cols-[auto_repeat(3,100px)] items-center gap-4 border-b border-border'>
          <div className={`w-fit rounded-t-md p-1 px-4 ${group.color}`}>
            <h5 className='text-sm font-medium text-white'>{group.name}</h5>
          </div>
          <span className='text-nowrap text-sm font-medium uppercase text-text-secondary'>Assignee</span>
          <span className='text-nowrap text-sm font-medium uppercase text-text-secondary'>Due Date</span>
          <span className='text-nowrap text-sm font-medium uppercase text-text-secondary'>Priority</span>
        </div>
        {droppable()}
      </div>
    );

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
        {canManipulateTasks && (
          <Button className='h-6 w-7' size='small' onClick={onAdd}>
            <FaPlus />
          </Button>
        )}
      </div>

      {droppable()}
    </div>
  );
}

function TasksList({ group, onEdit, onDelete, isDragging, layout, canManipulateTasks }) {
  const { user } = useUser();

  if (!group.tasks.length && !isDragging) {
    const message =
      group.name === 'To Do'
        ? 'No tasks to do. Feel free to add some!'
        : group.name === 'In Progress'
          ? 'No tasks in progress. Start working on something!'
          : 'No tasks marked as done. Complete some tasks to see them here!';

    return (
      <div className={`grid place-content-center ${layout === 'board' ? 'mt-20' : ' h-[100px]'}`}>
        <p className='text-center text-sm font-medium text-text-secondary'>{message}</p>
      </div>
    );
  }
  return group.tasks.map((task, index) => (
    <Draggable
      key={`draggable-${task.id}`}
      draggableId={`draggable-${task.id}`}
      index={index}
      type='TASK'
      isDragDisabled={!canManipulateTasks && +user?.id !== +task.assignee.id}
    >
      {(provided, snapshot) => (
        <NaturalDragAnimation style={getStyle(provided.draggableProps.style, snapshot)} snapshot={snapshot}>
          {(style) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={style}>
              <Task
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                layout={layout}
                canManipulateTasks={canManipulateTasks}
              />
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  ));
}

function AddNewTask({ currentGroup, onClose, currentTask, onAdd, onUpdate, teamMembers }) {
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
          teamMembers={teamMembers}
        />
      </div>
    </Modal>
  );
}
