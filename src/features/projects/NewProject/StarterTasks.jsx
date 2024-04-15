import { useEffect, useState } from 'react';
import { Button, DropDown } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { InternsDropDown } from './InternsDropDown';
import Task from '../Task';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getIncrementedID } from '@/utils/helpers';
import { DateTime } from 'luxon';

export function StarterTasks({ updateStatus, updateState, state }) {
  const [currentTab, setCurrentTab] = useState('view');
  const [tasks, setTasks] = useState(state);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    updateState?.(tasks);
    updateStatus(tasks.length ? 'completed' : 'skippable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className='relative h-full overflow-hidden'>
      <TasksList
        tasks={tasks}
        setTasks={setTasks}
        setCurrentTask={setCurrentTask}
        setCurrentTab={setCurrentTab}
        display={currentTab === 'view'}
      />
      <div
        className={`absolute flex h-full w-full flex-col justify-center overflow-auto pr-2 transition-transform duration-500 ${
          currentTab === 'add' ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <NewTask
          className='mobile:flex-row'
          status='To Do'
          onCancel={() => {
            setCurrentTab('view');
            setCurrentTask(null);
          }}
          currentTask={currentTask}
          onSubmit={(task) => {
            setTasks((prev) => {
              if (currentTask) return prev.map((t) => (t.id === task.id ? task : t));
              return [...prev, { id: getIncrementedID(tasks), ...task }];
            });
          }}
        />
      </div>
    </div>
  );
}

function TasksList({ tasks, setTasks, setCurrentTask, setCurrentTab, display }) {
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (!tasks.length)
      return (
        <>
          <img src='/SVG/tasks.svg' alt='' className='h-[150px]' />
          <h2 className='text-lg font-semibold text-text-primary'>Let&apos;s get started with some tasks</h2>
          <p className='text-sm font-medium text-text-secondary'>Kickstart your project with essential tasks.</p>
        </>
      );
    return (
      <div
        className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-x-4 gap-y-6 overflow-auto pr-1.5'
        ref={parent}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={(id) => {
              setCurrentTask(tasks.find((t) => t.id === id));
              setCurrentTab('add');
            }}
            onDelete={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
            onUpdate={(task) => setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))}
          />
        ))}
      </div>
    );
  };
  return (
    <div
      className={`absolute flex h-full w-full flex-col gap-4 pr-2   transition-transform duration-500 ${
        display ? '' : '-translate-y-full'
      }
      ${!tasks.length ? 'items-center justify-center text-center' : ''}
      `}
    >
      {render()}
      <Button color='secondary' onClick={() => setCurrentTab('add')}>
        {!tasks.length ? 'Create Tasks' : 'Add More'}
      </Button>
    </div>
  );
}

export function NewTask({ className, status, onCancel, currentTask, onSubmit }) {
  const defaultTask = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'None',
    assignee: 'None',
  };

  const {
    options: { isValid, isUpdated, formInputs, handleSubmit, reset, getValue, setValue, updateValues },
  } = useForm({
    defaultValues: currentTask || defaultTask,
    fields: [
      {
        name: 'title',
        label: 'Title',
        placeholder: "Task's Title",
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: "Task's description",
        rows: '5',
        rules: { required: false },
      },
      {
        name: 'priority',
        hidden: true,
      },
      {
        name: 'assignee',
        hidden: true,
      },
      {
        name: 'dueDate',
        type: 'date',
        label: 'Due Date',
        rules: { required: false },
        min: DateTime.now().toISODate(),
      },
    ],
    gridLayout: true,
    onSubmit: (data) => onSubmit({ ...data, status }),
  });

  useEffect(() => {
    updateValues(currentTask || defaultTask);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTask]);

  return (
    <>
      <div className={`mb-5 flex flex-col gap-5 ${className}`}>
        <div className='flex flex-1 flex-col gap-5'>
          {formInputs['title']}
          {formInputs['description']}
        </div>
        <div className='flex flex-1 flex-col gap-3.5'>
          <InternsDropDown getValue={getValue} setValue={setValue} />
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Priority</label>
            <DropDown
              toggler={
                <DropDown.Toggler>
                  <span>{getValue('priority')}</span>
                </DropDown.Toggler>
              }
            >
              {['None', 'High', 'Medium', 'Low'].map((e) => (
                <DropDown.Option key={e} onClick={() => setValue('priority', e)} isCurrent={e === getValue('priority')}>
                  {e}
                </DropDown.Option>
              ))}
            </DropDown>
          </div>
          {formInputs['dueDate']}
        </div>
      </div>
      <div className='mt-auto grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={() => reset(onCancel)}>
          Cancel
        </Button>
        <Button
          color='secondary'
          onClick={() => handleSubmit(onCancel, true)}
          disabled={currentTask ? !isUpdated || !isValid : !isValid}
        >
          {currentTask ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </>
  );
}
