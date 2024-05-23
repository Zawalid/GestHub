import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProject, useProject, useUpdateProject } from '../useProjects';
import { Button, Modal, ToolTip } from '@/components/ui';
import { IoFlag, IoTrashOutline, MdDriveFileRenameOutline } from '@/components/ui/Icons';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';
import { useConfirmationModal } from '@/hooks';
import { BasicInfo } from '../NewProject/BasicInfo';
import { useUser } from '@/hooks/useUser';
import { TeamMembers } from './TeamMembers';
import { Details, Progress } from './Details';
import { Stats } from './Stats';

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { project, isLoading } = useProject(id);
  const { subject, status, progress, priority } = project || {};
  const { user } = useUser();

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
        {['super-admin', 'admin', 'supervisor'].includes(user?.role) && (
          <>
            <Actions id={id} onEdit={() => setIsOpen(true)} role={user?.role} />
            <EditProject isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} />
          </>
        )}
      </div>
      <Details project={project} />
      <Stats isLoading={isLoading} tasks={project?.tasks || []} />
      <TeamMembers project={project} />
    </div>
  );
}

function Actions({ id, onEdit, role }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useDeleteProject();
  const navigate = useNavigate();

  return (
    <div className='flex gap-1.5'>
      {role !== 'supervisor' && (
        <Button
          shape='icon'
          onClick={() => {
            openModal({
              message: 'Are you sure you want to delete this project ?',
              title: 'Delete Project',
              confirmText: 'Delete',
              onConfirm: () => mutate(id, { onSuccess: () => navigate('/app/projects') }),
            });
          }}
        >
          <IoTrashOutline />
        </Button>
      )}
      <Button shape='icon' onClick={onEdit}>
        <MdDriveFileRenameOutline />
      </Button>
    </div>
  );
}

function EditProject({ isOpen, onClose, project }) {
  const { id, subject, description, startDate, endDate, priority, supervisor } = project || {};
  const { mutate } = useUpdateProject();


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='relative flex flex-col gap-6 overflow-auto p-5 sm:h-fit sm:w-[400px] sm:border md:max-h-[90%]'
      closeOnBlur={true}
    >
      <BasicInfo
        state={{ subject, description, startDate, endDate, priority, supervisor }}
        onSubmit={(data) => mutate({ id, data: { ...data, intern_id: data.projectManager } })}
        actionButtons={({ handleSubmit, reset, isUpdated }) => {
          return (
            <div className='mt-auto grid grid-cols-2 gap-4'>
              <Button color='tertiary' onClick={() => reset(onClose)}>
                Cancel
              </Button>
              <Button color='secondary' onClick={() => handleSubmit(onClose)} disabled={!isUpdated}>
                Update Project
              </Button>
            </div>
          );
        }}
        isUpdate={true}
      />
    </Modal>
  );
}
