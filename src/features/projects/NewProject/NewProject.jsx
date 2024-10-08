import { Button, Modal } from '@/components/ui';
import { IoChevronForwardOutline, IoChevronBackOutline } from '@/components/ui/Icons';
import { cloneElement, useState } from 'react';
import { BasicInfo } from './BasicInfo';
import { TeamMembers } from './TeamMembers';
import { StarterTasks } from './StarterTasks';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { Summary } from './Summary';
import { useAddProject } from '../useProjects';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterObject } from '@/utils/helpers';

const steps = [
  {
    number: 1,
    title: 'Basic Info',
    element: <BasicInfo className='mobile:flex-row mobile:items-center' />,
    stepStatus: 'uncompleted',
  },
  {
    number: 2,
    title: 'Team Members',
    element: <TeamMembers />,
    stepStatus: 'skippable',
  },
  {
    number: 3,
    title: 'Starter Tasks',
    element: <StarterTasks />,
    stepStatus: 'skippable',
  },
  {
    number: 4,
    title: 'Summary',
    element: <Summary />,
    stepStatus: 'last',
  },
];

const defaultProject = {
  'Basic Info': {
    subject: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'None',
    supervisor: 'Select Supervisor',
  },
  'Team Members': [],
  'Starter Tasks': [],
};

export default function NewProject() {
  const location = useLocation();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState(defaultProject);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [projectManager, setProjectManager] = useState(null);
  const { mutate: addProject, isPending } = useAddProject();
  const [parent] = useAutoAnimate({ duration: 400 });

  const nextStep = steps.find((step) => step.number - 1 === currentStep.number);
  const backStep = steps.find((step) => step.number + 1 === currentStep.number);

  const onClose = () => navigate('/app/projects');

  const getProps = () => {
    if (currentStep.title === 'Summary') return { projectData };
    return {
      state: projectData[currentStep.title],
      updateState: (newState) => {
        setProjectData((prev) => ({
          ...prev,
          [currentStep.title]: newState,
        }));
      },
      updateStatus: (stepStatus) => {
        setCurrentStep((prev) => ({ ...prev, stepStatus }));
      },
      ...(currentStep.title === 'Starter Tasks' && { teamMembers: projectData['Team Members'].map((m) => m.id) }),
      ...(currentStep.title === 'Team Members' && { projectManager, setProjectManager }),
    };
  };

  const createProject = () => {
    const project = {
      ...filterObject(projectData['Basic Info'],['supervisor'],'exclude'),
      status: 'Not Started',
      tasks: projectData['Starter Tasks'],
      teamMembers: projectData['Team Members'].map((t) => t.id),
      supervisor_id: projectData['Basic Info']?.supervisor?.id,
      intern_id: projectManager,
    };
    addProject(project, {
      onSuccess: () => {
        onClose();
        setProjectData(defaultProject);
        setCurrentStep(steps[0]);
      },
    });
  };

  return (
    <Modal
      isOpen={location.pathname === '/app/projects/new'}
      onClose={onClose}
      className='gap-6 p-5 md:h-[515px] md:w-4/5 md:border lg:w-3/5'
      closeButton={true}
      closeOnBlur={true}
    >
      <Steps steps={steps} currentStep={currentStep} />
      <div className='h-full overflow-y-auto overflow-x-hidden' ref={parent}>
        {cloneElement(currentStep.element, getProps())}
      </div>

      <Buttons
        onNext={() => {
          currentStep.title === 'Summary' ? createProject() : setCurrentStep(nextStep);
        }}
        canGoNext={!isPending && ['completed', 'skippable', 'last'].includes(currentStep.stepStatus)}
        nextButtonText={
          currentStep.stepStatus === 'skippable'
            ? 'Skip'
            : currentStep.stepStatus === 'last'
              ? 'Create Project'
              : 'Next'
        }
        onBack={() => setCurrentStep(backStep)}
        canGoBack={!isPending && backStep}
      />
    </Modal>
  );
}

function Steps({ steps, currentStep }) {
  return (
    <div className='flex justify-center gap-6'>
      {steps.map((step) => (
        <div className='flex flex-col items-center gap-2' key={step.title}>
          <div className='relative h-2 w-16 overflow-hidden rounded-lg bg-background-secondary'>
            <div
              className={`absolute left-0 h-full bg-primary transition-all duration-500 ${currentStep.number >= step.number ? 'w-full' : 'w-0'}`}
            ></div>
          </div>
          <span className='text-[10px] font-medium text-text-primary'>{step.title}</span>
        </div>
      ))}
    </div>
  );
}
function Buttons({ onNext, canGoNext, nextButtonText, onBack, canGoBack }) {
  return (
    <div className='mt-auto flex justify-between gap-3'>
      <Button color='tertiary' display='with-icon' onClick={onBack} disabled={!canGoBack}>
        <IoChevronBackOutline />
        Back
      </Button>
      <Button display='with-icon' onClick={onNext} disabled={!canGoNext}>
        {nextButtonText}
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
}
