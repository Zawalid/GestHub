import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProject, useProject } from '../useProjects';
import { Button, DropDown } from '@/components/ui';
import { FaPlus, IoEllipsisHorizontalSharp, IoTrashOutline } from '@/components/ui/Icons';
import AddNewMember from './AddNewMember';
import { STATUS_COLORS } from '@/utils/constants';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

{
  /* <div className='flex flex-1 items-center justify-between gap-5 sm:justify-end'>
        <div className=' h-9'>
          <Members members={teamMembers} size='large' />
        </div>
        <Button display='with-icon' className='text-nowrap' onClick={onAddNewMember}>
          <FaPlus />
          New Member
        </Button>
      </div> */
}

export default function Overview() {
  const [isOpen, setIsOpen] = useState();
  const { id } = useParams();
  const { project } = useProject(id);
  const { name, status, progress, teamMembers } = project || {};

  return (
    <div className='w-full'>
      <div className='flex justify-between gap-5'>
        <div className='grid grid-cols-[70px_auto] gap-2'>
          <Progress progress={progress} status={status} />
          <div className='space-y-3'>
            <h4 className='text-xl font-semibold text-text-primary'>{name}</h4>
            <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started']?.bg}`}>
              {status || 'Not Started'}
            </p>
          </div>
        </div>
        <Actions id={id} />
      </div>
      <AddNewMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

function Progress({ progress, status }) {
  return (
    <div className='relative flex items-center justify-center'>
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
      options={{className:'w-[200px]'}}
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
        Delete
      </DropDown.Option>
    </DropDown>
  );
}
