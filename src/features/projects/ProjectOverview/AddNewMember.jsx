import { useState } from 'react';
import { Button, Modal } from '@/components/ui';
import { AllInterns } from '../NewProject/TeamMembers';
import { useParams } from 'react-router-dom';
import { useProject, useUpdateProject } from '../useProjects';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { ToolTip } from '@/components/ui/ToolTip';

export default function AddNewMember({ isOpen, onClose }) {
  const { id } = useParams();
  const { project } = useProject(id);
  const [teamMembers, setTeamMembers] = useState(project.teamMembers);
  const { mutate } = useUpdateProject();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={false}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Add New Member</h1>
      <AllInterns teamMembers={teamMembers} setTeamMembers={setTeamMembers}>
        <ToolTip content={<span>Uncheck All</span>}>
          <Button
            shape='icon'
            className='relative ml-3'
            disabled={teamMembers.length === 0}
            onClick={() => setTeamMembers([])}
          >
            <RiCheckboxMultipleBlankLine />
            <span
              className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
                teamMembers.length > 0 ? 'scale-100' : 'scale-0'
              }`}
            >
              {teamMembers.length}
            </span>
          </Button>
        </ToolTip>
      </AllInterns>
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button
          color='tertiary'
          onClick={() => {
            onClose();
            setTeamMembers(project.teamMembers);
          }}
        >
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={
            teamMembers.length === project.teamMembers.length &&
            project.teamMembers.map((t) => t.id).every((id) => teamMembers.map((t) => t.id).includes(id))
          }
          onClick={() => {
            mutate({ id, data: { ...project, teamMembers, teamCount: teamMembers.length } });
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
