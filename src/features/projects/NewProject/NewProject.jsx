import { Button, Modal } from '@/components/ui';
import { IoChevronForwardOutline, IoChevronBackOutline } from '@/components/ui/Icons';
import { cloneElement, useState } from 'react';
import { BasicInfo } from './BasicInfo';
import { TeamMembers } from './TeamMembers';
import { StarterTasks } from './StarterTasks';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Summary } from './Summary';
import { useAddProject } from '../useProjects';

const steps = [
  {
    number: 1,
    title: 'Basic Info',
    element: <BasicInfo />,
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
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'None',
  },
  'Team Members': [],
  'Starter Tasks': [],
};

export default function NewProject({ isOpen, onClose }) {
  const [projectData, setProjectData] = useState(defaultProject);
  const [currentStep, setCurrentStep] = useState(steps[2]);
  const { mutate: addProject } = useAddProject();
  const [parent] = useAutoAnimate({ duration: 400 });

  const nextStep = steps.find((step) => step.number - 1 === currentStep.number);
  const backStep = steps.find((step) => step.number + 1 === currentStep.number);

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
    };
  };

  const createProject = () => {
    const project = {
      ...projectData['Basic Info'],
      status: 'Not Started',
      teamMembers: projectData['Team Members'].map((t) => t.id),
      tasks: projectData['Starter Tasks'].map((t) => t.id),
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
      isOpen={isOpen}
      onClose={onClose}
      className="gap-6 p-5 md:h-[500px] md:w-4/5 md:border lg:w-3/5"
      closeButton={true}
      closeOnBlur={false}
    >
      <Steps steps={steps} currentStep={currentStep} />
      <div className="h-full overflow-y-auto overflow-x-hidden pr-2" ref={parent}>
        {cloneElement(currentStep.element, getProps())}
      </div>

      <Buttons
        onNext={() => {
          currentStep.title === 'Summary' ? createProject() : setCurrentStep(nextStep);
        }}
        canGoNext={['completed', 'skippable', 'last'].includes(currentStep.stepStatus)}
        nextButtonText={
          currentStep.stepStatus === 'skippable'
            ? 'Skip'
            : currentStep.stepStatus === 'last'
              ? 'Create Project'
              : 'Next'
        }
        onBack={() => setCurrentStep(backStep)}
        canGoBack={backStep}
      />
    </Modal>
  );
}

function Steps({ steps, currentStep }) {
  return (
    <div className="flex justify-center gap-6">
      {steps.map((step) => (
        <div className="flex flex-col items-center gap-2" key={step.title}>
          <div className="relative h-2 w-16 overflow-hidden rounded-lg bg-background-secondary">
            <div
              className={`absolute left-0 h-full bg-primary transition-all duration-500
     ${currentStep.number >= step.number ? 'w-full' : 'w-0'}
     `}
            ></div>
          </div>
          <span className="text-[10px] font-medium text-text-primary">{step.title}</span>
        </div>
      ))}
    </div>
  );
}
function Buttons({ onNext, canGoNext, nextButtonText, onBack, canGoBack }) {
  return (
    <div className="mt-auto flex justify-between gap-3">
      <Button color="tertiary" display="with-icon" onClick={onBack} disabled={!canGoBack}>
        <IoChevronBackOutline />
        Back
      </Button>
      <Button display="with-icon" onClick={onNext} disabled={!canGoNext}>
        {nextButtonText}
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
}
