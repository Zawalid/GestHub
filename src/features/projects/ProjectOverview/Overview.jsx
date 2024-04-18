import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useDeleteProject, useProject, useUpdateProject } from '../useProjects';
import { Button, DropDown } from '@/components/ui';
import {
  BsListCheck,
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdOutlineGroupAdd,
  MdOutlineGroupRemove,
  TbProgressCheck,
} from '@/components/ui/Icons';
import AddNewMember from './AddNewMember';
import { STATUS_COLORS } from '@/utils/constants';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

export default function Overview() {
  const { id } = useParams();
  const { project } = useProject(id);
  const { name, status, progress } = project || {};

  return (
    <div className='flex flex-1 flex-col gap-6 overflow-auto pr-2'>
      <div className='flex justify-between gap-5'>
        <div className='grid gap-2 sm:grid-cols-[70px_auto]'>
          <Progress progress={progress} status={status} />
          <div className='space-y-3'>
            <h4 className='font-semibold text-text-primary sm:text-xl'>{name}</h4>
            <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started']?.bg}`}>
              {status || 'Not Started'}
            </p>
          </div>
        </div>
        <Actions id={id} />
      </div>
      <TeamMembers project={project} />
    </div>
  );
}

function Progress({ progress, status }) {
  return (
    <>
      <div className='flex items-center gap-2 sm:hidden'>
        <span className='text-xs font-medium text-text-primary'>{progress}%</span>
        <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
          <div
            className={`absolute top-0 h-full rounded-lg transition-all duration-500 ${STATUS_COLORS[status].bg}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className='relative hidden items-center justify-center sm:flex'>
        <svg className='h-full w-full' viewBox='0 0 100 100'>
          <circle
            className='stroke-current text-border'
            strokeWidth='8'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
          ></circle>
          <circle
            className='stroke-current text-background-secondary'
            strokeWidth='6'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
          ></circle>
          <circle
            className={`progress-ring__circle  stroke-current ${STATUS_COLORS[status].text}`}
            strokeWidth='6'
            strokeLinecap='round'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
            strokeDasharray='251.2'
            strokeDashoffset={`calc(251.2 - (251.2 * ${progress}) / 100)`}
          ></circle>
        </svg>
        <span className='absolute text-xs font-medium text-text-primary'>{progress}%</span>
      </div>
    </>
  );
}

function Actions({ id }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useDeleteProject();
  const navigate = useNavigate();

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      options={{ className: 'w-[200px]' }}
    >
      <DropDown.Option
        onClick={() =>
          openModal({
            message: 'Are you sure you want to delete this project ?',
            title: 'Delete Project',
            confirmText: 'Delete',
            onConfirm: () => mutate(id, { onSuccess: () => navigate('/app/projects') }),
          })
        }
      >
        <IoTrashOutline />
        Delete Project
      </DropDown.Option>
    </DropDown>
  );
}

function TeamMembers({ project }) {
  const [isOpen, setIsOpen] = useState();
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <div className='space-y-6 rounded-lg border border-border p-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-text-tertiary'>Team Members</h2>
        <Button display='with-icon' color='secondary' className='text-nowrap' onClick={() => setIsOpen(true)}>
          <MdOutlineGroupAdd size={18} />
          New Member
        </Button>
      </div>
      {project?.teamMembers.length === 0 ? (
        <div className='grid h-[250px] place-content-center'>
          <p className='text-text-secondary text-center'>No team members have been added to this project yet.</p>
        </div>
      ) : (
        <div className='grid auto-cols-[250px] grid-flow-col gap-6 overflow-auto pb-2' ref={parent}>
          {project?.teamMembers
            .sort((a, b) => a.firstName?.localeCompare(b.firstName))
            .map((member) => (
              <Member key={member.id} member={member} project={project} />
            ))}
        </div>
      )}

      <AddNewMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function Member({ member, project }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useUpdateProject();

  const { id: projectId, tasks, teamMembers } = project || {};
  const { id, avatar, firstName, lastName } = member;

  const assignedTasks = tasks.filter((task) => task.assignee?.id === id);
  const doneTasks = assignedTasks.filter((task) => task.status === 'Done');

  return (
    <div className='rounded-lg border border-border bg-background-disabled p-5 pt-3'>
      <div className='flex items-center justify-between'>
        <DropDown
          toggler={
            <Button shape='icon' size='small'>
              <IoEllipsisHorizontalSharp />
            </Button>
          }
          options={{ className: 'w-[200px]', placement: 'bottom-start' }}
        >
          <DropDown.Option
            onClick={() =>
              openModal({
                message: 'Are you sure you want to remove this member from this project ?',
                title: 'Remove Member',
                confirmText: 'Remove',
                onConfirm: () => {
                  const updatedTasks = tasks.map((task) => {
                    return assignedTasks.map((t) => t.id).includes(task.id) ? { ...task, assignee: 'None' } : task;
                  });
                  const updatedTeam = teamMembers.filter((member) => member.id !== id);
                  mutate({ id: projectId, data: { ...project, teamMembers: updatedTeam, tasks: updatedTasks } });
                },
              })
            }
          >
            <MdOutlineGroupRemove />
            Remove Member
          </DropDown.Option>
        </DropDown>
      </div>
      <div className='mb-8 mt-3 space-y-3'>
        <img
          src={avatar || '/images/default-profile.jpg'}
          alt='avatar'
          className='mx-auto h-16 w-16 rounded-full border border-border object-cover shadow-md'
        />
        <div className='space-y-1 text-center'>
          <h3 className='font-semibold text-text-primary'>{`${firstName} ${lastName}`}</h3>
          <p className='text-xs text-text-tertiary'>Front End Developer</p>
        </div>
      </div>
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-1 text-text-secondary'>
          <BsListCheck />
          <span className='text-xs font-medium '>{assignedTasks.length} Tasks</span>
        </div>
        <div className='flex items-center gap-1 text-text-secondary'>
          <TbProgressCheck />
          <span className='text-xs font-medium '>{(doneTasks.length / assignedTasks.length) * 100 || 0}%</span>
        </div>
      </div>
      <Link to={`/app/interns/${id}`}>
        <Button color='secondary' type='outline' className='w-full'>
          View Profile
        </Button>
      </Link>
    </div>
  );
}
