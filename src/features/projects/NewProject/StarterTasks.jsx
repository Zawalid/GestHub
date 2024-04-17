import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DateTime } from 'luxon';
import { Button, DropDown } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import Task from '../Task';
import { getIncrementedID } from '@/utils/helpers';
import { Intern } from './TeamMembers';
import { MdOutlineDoNotDisturb } from 'react-icons/md';

export function StarterTasks({ updateStatus, updateState, state, teamMembers }) {
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
          teamMembers={teamMembers}
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
        className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-x-4  gap-y-6 overflow-auto pr-1.5 pt-5'
        ref={parent}
      >
        {tasks.map((task) => (
          <div className='min-w-[250px] flex-1' key={task.id}>
            <Task
              task={task}
              onEdit={(task) => {
                setCurrentTask(tasks.find((t) => t.id === task.id));
                setCurrentTab('add');
              }}
              onDelete={(task) => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
              onUpdate={(task) => setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))}
            />
          </div>
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

export function NewTask({ className, status, onCancel, currentTask, onSubmit, teamMembers }) {
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
          <InternsDropDown teamMembers={teamMembers} getValue={getValue} setValue={setValue} />
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

function InternsDropDown({ teamMembers, getValue, setValue }) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium capitalize text-text-tertiary'>Assignee</label>
      <DropDown
        toggler={
          <DropDown.Toggler>
            {getValue('assignee') === 'None' ? 'None' : <Intern intern={getValue('assignee')} />}
          </DropDown.Toggler>
        }
        options={{
          shouldCloseOnClick: false,
          className: 'overflow-y-auto',
        }}
      >
        {teamMembers?.map((intern) => (
          <DropDown.Option
            size='small'
            key={intern.id}
            className='capitalize'
            onClick={() => setValue('assignee', intern)}
            isCurrent={intern === getValue('assignee')}
          >
            <Intern intern={intern} />
          </DropDown.Option>
        ))}
        <DropDown.Option onClick={() => setValue('assignee', 'None')} isCurrent={'None' === getValue('assignee')}>
          <MdOutlineDoNotDisturb size={20} />
          <span className='text-base'>None</span>
        </DropDown.Option>
      </DropDown>
    </div>
  );
}
