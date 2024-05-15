import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useUpdateProject } from '../useProjects';
import { Button, Status, ToolTip } from '@/components/ui';
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
import { useInternsByIds } from '@/features/interns/useInterns';
import { getProgress } from '@/utils/helpers';
import Avatar from '@/components/ui/Avatar';

export function TeamMembers({ project }) {
  const [isOpen, setIsOpen] = useState();
  const [parent] = useAutoAnimate({ duration: 400 });
  const { user } = useUser();
  const { interns: teamMembers, isLoading, error } = useInternsByIds(project?.teamMembers);

  const render = () => {
    if (error)
      return (
        <div className='relative h-[250px] w-full'>
          <Status status='error' size='small' message={error?.message} />
        </div>
      );
    if (isLoading) return <MembersSkeleton />;
    if (project?.teamMembers.length === 0) {
      return (
        <div className='grid h-[250px] place-content-center place-items-center gap-3'>
          <img src='/SVG/team.svg' alt='' className='w-[200px] mobile:w-[250px]' />
          <p className='moobile:text-base text-center text-sm text-text-secondary'>
            No team members have been added to this project yet.
          </p>
        </div>
      );
    }
    return (
      <div className='grid auto-cols-[250px] grid-flow-col gap-6 overflow-auto pb-2' ref={parent}>
        {teamMembers
          .sort((a, b) => a.firstName?.localeCompare(b.firstName))
          .map((member) => (
            <Member key={member.id} member={member} project={project} />
          ))}
      </div>
    );
  };

  return (
    <div className='space-y-6 rounded-lg border border-border p-3'>
      <div className='flex items-center justify-between'>
        <h2 className='flex items-center gap-2 font-semibold text-text-primary mobile:text-lg'>
          Team Members
          {(!project?.projectManager || !project?.teamMembers.includes(project?.projectManager)) && (
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
        {['super-admin', 'admin', 'supervisor'].includes(user?.role) && (
          <>
            <Button display='with-icon' color='secondary' className='text-nowrap' onClick={() => setIsOpen(true)}>
              <MdOutlineGroupAdd size={18} />
              New Member
            </Button>

            <AddNewMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </>
        )}
      </div>
      {render()}
    </div>
  );
}
function Member({ member, project }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useUpdateProject();
  const { user } = useUser();

  const { id: projectId, tasks, teamMembers, projectManager } = project || {};
  const { id, avatar, fullName, email, gender } = member;

  const assignedTasks = tasks.filter((task) => task.assignee?.id === id);
  const doneTasks = assignedTasks.filter((task) => task.status === 'Done');

  return (
    <div className='rounded-lg border border-border bg-background-disabled p-5 pt-3'>
      {['super-admin', 'admin', 'supervisor'].includes(user?.role) && (
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
                    mutate({
                      id: projectId,
                      data: {
                        teamMembers: teamMembers.filter((member) => member !== id),
                        intern_id: projectManager === id ? null : projectManager,
                      },
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
              onClick={() => mutate({ id: projectId, data: { intern_id: id } })}
            >
              <MdManageAccounts />
            </Button>
          </ToolTip>
        </div>
      )}
      <div className='relative mb-8 mt-5 text-center'>
        <PiCrown
          className={`absolute -top-5 left-1/2 -translate-x-1/2 text-2xl text-primary transition-transform duration-300 
        ${id === projectManager ? 'scale-100' : 'scale-0'}
        `}
        />
        <Avatar custom={{ avatar, gender }} className='mx-auto h-16 w-16' />
        <div className='my-3'>
          <h3 className='text-lg font-semibold text-text-primary'>{fullName}</h3>
          <p className='text-xs font-medium text-text-primary'>{email}</p>
        </div>
        <p className='text-sm font-medium text-text-secondary'>
          {id === projectManager ? 'Project Manager' : 'Team Member'}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 text-text-secondary'>
          <BsListCheck />
          <span className='text-xs font-medium '>{assignedTasks.length} Tasks</span>
        </div>
        <div className='flex items-center gap-1 text-text-secondary'>
          <TbProgressCheck />
          <span className='text-xs font-medium '>{getProgress(doneTasks.length / assignedTasks.length)}%</span>
        </div>
      </div>
    </div>
  );
}

function MembersSkeleton() {
  return (
    <div className='grid animate-pulse auto-cols-[250px] grid-flow-col gap-6 overflow-auto pb-2'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='rounded-lg border border-border bg-background-disabled p-5 pt-3'>
          <div className='flex items-center justify-between'>
            <div className='h-6 w-6 rounded-md bg-background-tertiary'></div>
            <div className='h-6 w-6 rounded-md bg-background-tertiary'></div>
          </div>
          <div className='mb-8 mt-5 flex flex-col items-center gap-3'>
            <div className='mb-2 h-16 w-16 rounded-full border border-border bg-background-tertiary'></div>
            <div className='h-2 w-28 rounded-lg bg-background-tertiary'></div>
            <div className='h-2 w-20 rounded-lg bg-background-secondary'></div>
          </div>
          <div className='mb-5 flex items-center justify-between'>
            <div className='h-3 w-8 rounded-md bg-background-tertiary'></div>
            <div className='h-3 w-8 rounded-md bg-background-tertiary'></div>
          </div>
          <div className='flex justify-center rounded-lg border border-border p-4'>
            <div className='h-2 w-20 rounded-lg bg-background-secondary'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
