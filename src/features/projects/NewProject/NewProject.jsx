import { Button, Modal } from "@/components/ui";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "@/components/ui/Icons";
import { cloneElement, useState } from "react";
import { BasicInfo } from "./BasicInfo";
import { TeamMembers } from "./TeamMembers";
import { StarterTasks } from "./StarterTasks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Summary } from "./Summary";
import { useAddProject } from "../useProjects";

const steps = [
  {
    number: 1,
    title: "Basic Info",
    element: <BasicInfo />,
    stepStatus: "uncompleted",
  },
  {
    number: 2,
    title: "Team Members",
    element: <TeamMembers />,
    stepStatus: "skippable",
  },
  {
    number: 3,
    title: "Starter Tasks",
    element: <StarterTasks />,
    stepStatus: "skippable",
  },
  {
    number: 4,
    title: "Summary",
    element: <Summary />,
    stepStatus: "last",
  },
];

export default function NewProject() {
  const [projectData, setProjectData] = useState({
    "Basic Info": {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "None",
    },
    "Team Members": [],
    "Starter Tasks": [],
  });
  const [currentStep, setCurrentStep] = useState(steps[2]);
  const { mutate: addProject } = useAddProject();
  const [parent] = useAutoAnimate({ duration: 400 });

  const nextStep = steps.find((step) => step.number - 1 === currentStep.number);
  const backStep = steps.find((step) => step.number + 1 === currentStep.number);

  const getProps = () => {
    if (currentStep.title === "Summary") return { projectData };
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

  return (
    <Modal
      isOpen={true}
      className="p-5 gap-6 md:h-[480px] md:border lg:w-3/5"
      closeButton={true}
    >
      <Steps steps={steps} currentStep={currentStep} />
      <div
        className={`h-full ${
          currentStep.title === "Summary"
            ? " overflow-y-auto overflow-x-hidden"
            : ""
        }`}
        ref={parent}
      >
        {cloneElement(currentStep.element, getProps())}
      </div>

      <Buttons
        onNext={() => {
          if (currentStep.title === "Summary") {
            const project = {
              ...projectData["Basic Info"],
              status: "Not Started",
              teamMembers: projectData["Team Members"].map((t) => t.id),
              tasks: projectData["Starter Tasks"].map((t) => t.id),
            };
            return addProject(project);
          }
          setCurrentStep(nextStep);
        }}
        canGoNext={["completed", "skippable", "last"].includes(
          currentStep.stepStatus
        )}
        nextButtonText={
          currentStep.stepStatus === "skippable"
            ? "Skip"
            : currentStep.stepStatus === "last"
            ? "Create Project"
            : "Next"
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
          <div className="rounded-lg overflow-hidden w-16 h-2 bg-background-secondary relative">
            <div
              className={`absolute bg-primary h-full left-0 transition-all duration-500
     ${currentStep.number >= step.number ? "w-full" : "w-0"}
     `}
            ></div>
          </div>
          <span className="font-medium text-[10px] text-text-primary">
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
function Buttons({ onNext, canGoNext, nextButtonText, onBack, canGoBack }) {
  return (
    <div className="flex mt-auto justify-between gap-3">
      <Button
        color="tertiary"
        display="with-icon"
        onClick={onBack}
        disabled={!canGoBack}
      >
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
