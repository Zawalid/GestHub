import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DateTime } from 'luxon';
import { useDeleteProject, useProject, useUpdateProject } from '../useProjects';
import { Button, DropDown, Modal, ToolTip } from '@/components/ui';
import {
  BsListCheck,
  IoEllipsisHorizontalSharp,
  IoFlag,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  MdManageAccounts,
  MdOutlineGroupAdd,
  MdOutlineGroupRemove,
  PiCrown,
  TbProgressCheck,
} from '@/components/ui/Icons';
import AddNewMember from './AddNewMember';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';
import { useConfirmationModal, useAnimatedProgress } from '@/hooks';
import { BasicInfo } from '../NewProject/BasicInfo';
import { formatDate } from '@/utils/helpers';

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { project } = useProject(id);
  const { subject, status, progress, priority } = project || {};

  return (
    <div className='flex flex-1 flex-col gap-6 overflow-auto pr-2'>
      <div className='flex justify-between gap-5'>
        <div className='grid flex-1 gap-2 sm:grid-cols-[70px_auto]'>
          <Progress progress={progress} status={status} />
          <div className='space-y-3'>
            <h4 className='flex items-center gap-2 font-semibold text-text-primary sm:text-xl'>
              <span>{subject}</span>
              <ToolTip
                content={
                  <span className='text-xs text-text-secondary'>{priority === 'None' ? 'No' : priority} Priority</span>
                }
              >
                <span>
                  <IoFlag className={`cursor-pointer ${PRIORITY_COLORS[priority]?.text}`} />
                </span>
              </ToolTip>
            </h4>
            <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started']?.bg}`}>
              {status || 'Not Started'}
            </p>
          </div>
        </div>
        <Actions id={id} onEdit={() => setIsOpen(true)} />
        <EditProject isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} />
      </div>
      <Details project={project} />
      <TeamMembers project={project} />
    </div>
  );
}

function Progress({ progress: pr, status }) {
  const progress = useAnimatedProgress(pr);
  return (
    <>
      <div className='flex items-center gap-2 sm:hidden'>
        <span className='text-xs font-medium text-text-primary'>{progress}%</span>
        <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
          <div
            className={`absolute top-0 h-full rounded-lg transition-all duration-[3s] ${STATUS_COLORS[status]?.bg}`}
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
            className={`progress-ring__circle  stroke-current ${STATUS_COLORS[status]?.text}`}
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

function Actions({ id, onEdit }) {
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
      <DropDown.Option onClick={onEdit}>
        <MdDriveFileRenameOutline />
        Edit Project
      </DropDown.Option>
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

function EditProject({ isOpen, onClose, project }) {
  const { id, subject, description, startDate, endDate, priority } = project || {};
  const { mutate } = useUpdateProject();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='relative flex flex-col gap-6 p-5 sm:h-fit sm:w-[400px] sm:border'
      closeOnBlur={false}
    >
      <BasicInfo
        state={{ subject, description, startDate, endDate, priority }}
        onSubmit={(data) => mutate({ id, data: { ...project, ...data } })}
        actionButtons={({ handleSubmit, reset, isUpdated, isValid }) => {
          return (
            <div className='mt-auto grid grid-cols-2 gap-4'>
              <Button color='tertiary' onClick={() => reset(onClose)}>
                Cancel
              </Button>
              <Button color='secondary' onClick={() => handleSubmit(onClose)} disabled={!isUpdated || !isValid}>
                Update Project
              </Button>
            </div>
          );
        }}
      />
    </Modal>
  );
}

function Details({ project }) {
  const { description, startDate, endDate, status } = project || {};

  return (
    <div className='space-y-6 rounded-lg  border-border '>
      <div className='flex  flex-1 flex-col gap-2'>
        <label className='text-sm font-medium text-text-tertiary'>Description</label>
        <textarea
          placeholder='This project has no description...'
          rows='4'
          readOnly
          className='resize-none rounded-lg bg-background-secondary p-3 text-sm text-text-primary outline-none placeholder:text-sm
          '
          value={description}
        ></textarea>
      </div>
      <TimeLine startDate={startDate} endDate={endDate} status={status} />
    </div>
  );
}

function TimeLine({ startDate, endDate, status }) {
  const today = DateTime.fromISO(DateTime.now().toISO());
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const currentDay = Math.ceil(today.diff(start, 'days').toObject().days);
  const duration = Math.ceil(end.diff(start, 'days').toObject().days);
  const daysLeft = Math.floor(end.diff(today, 'days').toObject().days);
  const daysToStart = Math.ceil(start.diff(today, 'days').toObject().days);
  const isOverdue = daysLeft <= 0;

  const progress = useAnimatedProgress((currentDay / duration) * 100);

  return (
    <div className='space-y-3 '>
      <label className='text-sm font-medium text-text-tertiary'>Timeline</label>
      <div className='flex justify-between'>
        <div className='flex items-center gap-1.5'>
          <span className='h-2 w-2 rounded-full bg-blue-500'></span>
          <ToolTip content={<span className='text-xs text-text-secondary'>Start Date</span>}>
            <span className='text-sm font-medium text-text-secondary'>{formatDate(startDate)}</span>
          </ToolTip>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='h-2 w-2 rounded-full bg-red-500'></span>
          <ToolTip content={<span className='text-xs text-text-secondary'>End Date</span>}>
            <span className='text-sm font-medium text-text-secondary'>{formatDate(endDate)}</span>
          </ToolTip>
        </div>
      </div>
      <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
        <div
          className={`absolute top-0 h-full max-w-full rounded-lg transition-all duration-[3s] ${
            isOverdue ? 'bg-red-500' : STATUS_COLORS[status]?.bg
          }`}
          style={{ width: daysToStart > 0 ? '12px' : `${isOverdue ? 100 : progress}%` }}
        >
          <ToolTip
            content={
              <span className='text-xs text-text-secondary'>
                {isOverdue
                  ? 'The project is overdue'
                  : daysToStart > 0
                    ? `The project will start in ${daysToStart} days`
                    : `${daysLeft} days left until the project ends`}{' '}
              </span>
            }
          >
            <span className='absolute -top-0.5 right-0 h-3 w-3 rounded-full bg-text-primary'></span>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

function TeamMembers({ project }) {
  const [isOpen, setIsOpen] = useState();
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <div className='space-y-6 rounded-lg border border-border p-3'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-text-primary mobile:text-lg'>Team Members</h2>
        <Button display='with-icon' color='secondary' className='text-nowrap' onClick={() => setIsOpen(true)}>
          <MdOutlineGroupAdd size={18} />
          New Member
        </Button>
      </div>
      {project?.teamMembers.length === 0 ? (
        <div className='grid h-[250px] place-content-center place-items-center gap-3'>
          <img src='/SVG/team.svg' alt='' className='w-[200px] mobile:w-[250px]' />
          <p className='moobile:text-base text-center text-sm text-text-secondary'>
            No team members have been added to this project yet.
          </p>
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

  const { id: projectId, tasks, teamMembers, projectManager } = project || {};
  const { id, avatar, firstName, lastName } = member;

  const assignedTasks = tasks.filter((task) => task.assignee?.id === id);
  const doneTasks = assignedTasks.filter((task) => task.status === 'Done');

  return (
    <div className='rounded-lg border border-border bg-background-disabled p-5 pt-3'>
      <div className='flex items-center justify-between'>
        <ToolTip content={<span className='text-xs text-text-secondary'> Remove Member</span>}>
          <Button
            shape='icon'
            size=''
            onClick={() => {
              openModal({
                message: 'Are you sure you want to remove this member from this project ?',
                title: 'Remove Member',
                confirmText: 'Remove',
                onConfirm: () => {
                  const updatedTasks = tasks.map((task) => {
                    return assignedTasks.map((t) => t.id).includes(task.id) ? { ...task, assignee: 'None' } : task;
                  });
                  const updatedTeam = teamMembers.filter((member) => member.id !== id);
                  mutate({
                    id: projectId,
                    data: { ...project, teamMembers: updatedTeam, tasks: updatedTasks, projectManager: null },
                  });
                },
              });
            }}
          >
            <span>
              <MdOutlineGroupRemove />
            </span>
          </Button>
        </ToolTip>
        <ToolTip content={<span className='text-xs text-text-secondary'> Make Manager</span>}>
          <Button
            shape='icon'
            size=''
            disabled={id === projectManager}
            onClick={() => mutate({ id: projectId, data: { ...project, projectManager: id } })}
          >
            <span>
              <MdManageAccounts />
            </span>
          </Button>
        </ToolTip>

        {/* <DropDown
          toggler={
            <Button shape='icon' size='small'>
              <IoEllipsisHorizontalSharp />
            </Button>
          }
          options={{ placement: 'bottom-start' }}
        >
          <DropDown.Option
           onClick={() => {
              openModal({
                message: 'Are you sure you want to remove this member from this project ?',
                title: 'Remove Member',
                confirmText: 'Remove',
                onConfirm: () => {
                  const updatedTasks = tasks.map((task) => {
                    return assignedTasks.map((t) => t.id).includes(task.id) ? { ...task, assignee: 'None' } : task;
                  });
                  const updatedTeam = teamMembers.filter((member) => member.id !== id);
                  mutate({
                    id: projectId,
                    data: { ...project, teamMembers: updatedTeam, tasks: updatedTasks, projectManager: null },
                  });
                },
              });
            }}
          >
            <MdOutlineGroupRemove />
            Remove Member
          </DropDown.Option>
          <DropDown.Option
            disabled={id === projectManager}
            onClick={() => mutate({ id: projectId, data: { ...project, projectManager: id } })}
          >
            <MdManageAccounts />
            Make Manager
          </DropDown.Option>
        </DropDown> */}
      </div>
      <div className='relative mb-8 mt-5 space-y-3 text-center'>
        <PiCrown
          className={`absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-primary transition-transform duration-300 
        ${id === projectManager ? 'scale-100' : 'scale-0'}
        `}
        />
        <img
          src={avatar || '/images/default-profile.jpg'}
          alt='avatar'
          className='mx-auto h-16 w-16 rounded-full border border-border object-cover shadow-md'
        />
        <h3 className='font-semibold text-text-primary'>{`${firstName} ${lastName}`}</h3>
        <p className='text-sm font-medium text-text-secondary'>
          {' '}
          {id === projectManager ? 'Project Manager' : 'Team Member'}
        </p>
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
