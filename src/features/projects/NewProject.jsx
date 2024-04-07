import { DropDown } from "@/components/ui/DropDown";
import { Button, Modal, SearchInput } from "@/components/ui";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "@/components/ui/Icons";
import { useForm } from "@/hooks/useForm";
import { cloneElement, useEffect, useState } from "react";
import { useInterns } from "../interns/useInterns";
import { Status } from "@/components/ui/Status";

export default function NewProject() {
  const [steps, setSteps] = useState([
    {
      number: 0,
      title: "Basic Info",
      element: <Form />,
      canSkip: true,
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
      canSkip: true,
    },
    {
      number: 2,
      title: "Starter Tasks",
      element: <StarterTasks />,
      canSkip: true,
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
        shouldSkip: (canSkip) => {
          setCurrentStep((prev) => ({ ...prev, canSkip }));
        },
      })}

      <Buttons
        onNext={() => nextStep && setCurrentStep(nextStep)}
        canGoNext={currentStep.canSkip && nextStep}
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
function Buttons({ onNext, canGoNext, onBack, canGoBack }) {
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
        Next
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
}

// Steps
function Form({ shouldSkip, updateState, step }) {
  const {
    options: { isValid, formInputs, values, getValue, setValue },
  } = useForm({
    defaultValues: step?.state || {},
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "Project's Name",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Project's description",
        rows: "5",
      },
      {
        name: "priority",
        hidden: true,
      },
      {
        name: "startDate",
        type: "date",
        label: "Start Date",
      },
      {
        name: "endDate",
        type: "date",
        label: "End Date",
      },
    ],
    gridLayout: true,
    // onSubmit,
  });

  useEffect(() => {
    shouldSkip?.(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  useEffect(() => {
    updateState?.(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="flex gap-5 w-full">
      <div className="flex flex-1 flex-col gap-5">
        {formInputs["name"]}
        {formInputs["description"]}
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {formInputs["startDate"]}
        {formInputs["endDate"]}
        <div className="gap-1.5 flex flex-col">
          <label className="font-medium text-text-tertiary text-sm">
            Priority
          </label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className="capitalize">{getValue("priority")}</span>
              </DropDown.Toggler>
            }
          >
            {["none", "high", "medium", "small"].map((e) => (
              <DropDown.Option
                key={e}
                className="capitalize"
                onClick={() => setValue("priority", e)}
                isCurrent={e === getValue("priority")}
              >
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
      </div>
    </div>
  );
}

function TeamMembers({ shouldSkip, updateState, step }) {
  const { interns, error, isLoading } = useInterns();
  return (
    <div className="flex h-40 divide-x-2 divide-border">
      <div className="flex-1 pr-4">
        <h3 className="text-text-secondary font-semibold">All Interns</h3>
        <SearchInput placeholder="Search for interns" />
        <div className="relative h-[200px]">
          {isLoading && <Status status="loading" size="small" />}
        </div>
      </div>
      <div className="flex-1 pl-4">
        <h3 className="text-text-secondary font-semibold">Team Members</h3>
      </div>
    </div>
  );
}

function StarterTasks({ shouldSkip, updateState, step }) {
  return <div className="">Starter Tasks</div>;
}
