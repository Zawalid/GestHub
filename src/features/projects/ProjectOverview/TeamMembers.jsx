import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useUpdateProject } from '../useProjects';
import { Button, ToolTip } from '@/components/ui';
import {
  BsListCheck,
  BsFillInfoCircleFill,
  MdManageAccounts,
  MdOutlineGroupAdd,
  MdOutlineGroupRemove,
  PiCrown,
  TbProgressCheck,
} from '@/components/ui/Icons';
import AddNewMember from './AddNewMember';
import { useConfirmationModal } from '@/hooks';
import { useUser } from '@/hooks/useUser';

export function TeamMembers({ project }) {
  const [isOpen, setIsOpen] = useState();
  const [parent] = useAutoAnimate({ duration: 400 });
  const { user } = useUser();

  return (
    <div className='space-y-6 rounded-lg border border-border p-3'>
      <div className='flex items-center justify-between'>
        <h2 className='flex items-center gap-2 font-semibold text-text-primary mobile:text-lg'>
          Team Members
          {(!project?.projectManager || !project?.teamMembers.map((p) => +p.id).includes(+project?.projectManager)) && (
            <ToolTip
              content={
                <span className='text-xs text-text-secondary'>No project manager assigned. Please assign one.</span>
              }
            >
              <span>
                <BsFillInfoCircleFill className='text-blue-500' />
              </span>
            </ToolTip>
          )}
        </h2>
        {user?.role === 'supervisor' && (
          <>
            <Button display='with-icon' color='secondary' className='text-nowrap' onClick={() => setIsOpen(true)}>
              <MdOutlineGroupAdd size={18} />
              New Member
            </Button>

            <AddNewMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </>
        )}
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
    </div>
  );
}
function Member({ member, project }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useUpdateProject();
  const { user } = useUser();

  const { id: projectId, tasks, teamMembers, projectManager } = project || {};
  const { id, avatar, firstName, lastName } = member;

  const assignedTasks = tasks.filter((task) => task.assignee?.id === id);
  const doneTasks = assignedTasks.filter((task) => task.status === 'Done');

  return (
    <div className='rounded-lg border border-border bg-background-disabled p-5 pt-3'>
      {user?.role === 'supervisor' && (
        <div className='flex items-center justify-between'>
          <ToolTip content={<span className='text-xs text-text-secondary'> Remove Member</span>}>
            <Button
              shape='icon'
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
            </Button>
          </ToolTip>
          <ToolTip content={<span className='text-xs text-text-secondary'> Make Manager</span>}>
            <Button
              shape='icon'
              disabled={id === projectManager}
              onClick={() => mutate({ id: projectId, data: { ...project, projectManager: id } })}
            >
              <MdManageAccounts />
            </Button>
          </ToolTip>
        </div>
      )}
      <div className='relative mb-8 mt-5 space-y-3 text-center'>
        <PiCrown
          className={`absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-primary transition-transform duration-300 
        ${+id === +projectManager ? 'scale-100' : 'scale-0'}
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
          {+id === +projectManager ? 'Project Manager' : 'Team Member'}
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
