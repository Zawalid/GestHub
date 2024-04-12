import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button, DropDown } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { InternsDropDown } from './InternsDropDown';

export function StarterTasks({ updateStatus, updateState, state }) {
  const [currentTab, setCurrentTab] = useState('view');
  const [tasks, setTasks] = useState(state);

  useEffect(() => {
    updateState?.(tasks);
    updateStatus(tasks.length ? 'completed' : 'skippable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="relative h-full overflow-hidden">
      {tasks.length ? (
        <TasksList tasks={tasks} />
      ) : (
        <StarterTasksPrompt setCurrentTab={setCurrentTab} display={currentTab === 'view'} />
      )}
      <NewTask
        setCurrentTab={setCurrentTab}
        display={currentTab === 'add'}
        onAddTask={(task) => setTasks((prev) => [...prev, task])}
      />
    </div>
  );
}

function StarterTasksPrompt({ setCurrentTab, display }) {
  return (
    <div
      className={`absolute flex h-full w-full flex-col items-center justify-center gap-4 pr-2 text-center  transition-transform duration-500 ${
        display ? '' : '-translate-y-full'
      }`}
    >
      <img src="/SVG/tasks.svg" alt="" className="h-[150px]" />
      <h2 className="text-lg font-semibold text-text-primary">Let&apos;s get started with some tasks</h2>
      <p className="text-sm font-medium text-text-secondary">Kickstart your project with essential tasks.</p>
      <Button onClick={() => setCurrentTab('add')}>Create Tasks</Button>
    </div>
  );
}

function TasksList({ tasks }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {tasks.map((task, index) => (
        <div key={index} className="rounded-lg border border-border bg-background-secondary p-4 shadow-sm">
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.dueDate}</p>
          <p>{task.priority}</p>
          <p>{task.status}</p>
          <p>{task.assignee.firstName}</p>
        </div>
      ))}
    </div>
  );
}

function NewTask({ setCurrentTab, display, onAddTask }) {
  const {
    options: { isValid, formInputs, handleSubmit, getValue, setValue },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'None',
      assignee: 'None',
      status: 'Not Started',
    },
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
      },
      {
        name: 'priority',
        hidden: true,
      },
      {
        name: 'status',
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
      },
    ],
    gridLayout: true,
    onSubmit: (data) => onAddTask(data),
  });

  return (
    <div
      className={`absolute flex h-full w-full flex-col justify-center overflow-auto pr-2 transition-transform duration-500 ${
        display ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex flex-col gap-5 mobile:flex-row">
        <div className="flex flex-1 flex-col gap-5">
          {formInputs['title']}
          {formInputs['description']}
        </div>
        <div className="flex flex-1 flex-col gap-3.5">
          <InternsDropDown getValue={getValue} setValue={setValue} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-tertiary">Priority</label>
            <DropDown
              toggler={
                <DropDown.Toggler>
                  <span>{getValue('priority')}</span>
                </DropDown.Toggler>
              }
            >
              {['None', 'High', 'Medium', 'Small'].map((e) => (
                <DropDown.Option key={e} onClick={() => setValue('priority', e)} isCurrent={e === getValue('priority')}>
                  {e}
                </DropDown.Option>
              ))}
            </DropDown>
          </div>
          {formInputs['dueDate']}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <Button color="tertiary" onClick={() => setCurrentTab('view')}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleSubmit(() => {
              setCurrentTab('view');
              setCurrentTab('view');
              toast.success('Task has been created successfully');
            }, true)
          }
          disabled={!isValid}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
