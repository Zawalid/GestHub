import { Button, Modal } from "@/components/ui";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "@/components/ui/Icons";
import { cloneElement, useState } from "react";
import { BasicInfo } from "./BasicInfo";
import { TeamMembers } from "./TeamMembers";
import { StarterTasks } from "./StarterTasks";

export default function NewProject() {
  const [steps, setSteps] = useState([
    {
      number: 0,
      title: "Basic Info",
      element: <BasicInfo />,
      stepStatus: "uncompleted",
      state: {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "none",
      },
    },
    {
      number: 1,
      title: "Team Members",
      element: <TeamMembers />,
      stepStatus: "skippable",
      state: [],
    },
    {
      number: 2,
      title: "Starter Tasks",
      element: <StarterTasks />,
      stepStatus: "skippable",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(steps[1]);

  const nextStep = steps.find((step) => step.number - 1 === currentStep.number);
  const backStep = steps.find((step) => step.number + 1 === currentStep.number);

  return (
    <Modal
      isOpen={true}
      className="p-5 gap-6 md:h-fit md:border lg:w-3/5"
      closeButton={true}
    >
      <h1 className="text- text-text-primary font-bold text-2xl">
        Add New Project
      </h1>
      <Steps steps={steps} currentStep={currentStep} />
      {/* With animation but not secure */}

      {/* <div className="flex h-[250px] overflow-hidden relative">
        {steps.map((step) => (
          <div
            key={step.title}
            className="absolute transition-transform duration-500 w-full h-full"
            style={{
              transform: `translateX(${
                ( step.number - currentStep.number) * 100
              }%)`,
            }}
          >
            {step.element}
          </div>
        ))}
      </div> */}

      {/* No animation but secure */}

      {cloneElement(currentStep.element, {
        step: currentStep,
        updateState: (state) => {
          setSteps((prev) =>
            prev.map((s) =>
              s.number === currentStep.number ? { ...s, state } : s
            )
          );
        },
        updateStatus: (stepStatus) => {
          setCurrentStep((prev) => ({ ...prev, stepStatus }));
        },
      })}

      <Buttons
        onNext={() => nextStep && setCurrentStep(nextStep)}
        canGoNext={
          ["completed", "skippable"].includes(currentStep.stepStatus) &&
          nextStep
        }
        nextButtonText={
          currentStep.stepStatus === "skippable" ? "Skip" : "Next"
        }
        onBack={() => backStep && setCurrentStep(backStep)}
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
