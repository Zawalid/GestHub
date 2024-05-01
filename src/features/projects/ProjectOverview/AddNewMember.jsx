import { useState } from 'react';
import { Button, Modal } from '@/components/ui';
import { AllInterns } from '../NewProject/TeamMembers';
import { useParams } from 'react-router-dom';
import { useProject, useUpdateProject } from '../useProjects';


export default function AddNewMember({ isOpen, onClose }) {
  const { id } = useParams();
  const { project } = useProject(id);
  const [members, setMembers] = useState([]);
  const { mutate } = useUpdateProject();

  const close = () => (onClose(), setMembers([]));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={false}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Add New Member</h1>
      <AllInterns
        teamMembers={members}
        setTeamMembers={setMembers}
        filter={(interns) => interns?.filter((intern) => !project?.teamMembers.map((m) => m).includes(intern.id))}
        selectedMembers={members}
      />
        
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={close}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={members.length === 0}
          onClick={() => {
            const teamMembers = [...project.teamMembers, ...members.map(m => m.id)];
            mutate({ id, data: { teamMembers } });
            close();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
