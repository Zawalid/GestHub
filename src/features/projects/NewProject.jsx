import { DropDown } from "@/components/ui/DropDown";
import { Button, Modal } from "@/components/ui";
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
} from "@/components/ui/Icons";
import { useForm } from "@/hooks/useForm";

export default function NewProject() {
  return (
    <Modal
      isOpen={true}
      className="p-5 gap-6 md:h-fit md:border lg:w-3/5"
      closeButton={true}
    >
      <h1 className="text- text-text-primary font-bold text-2xl">
        Add New Project
      </h1>
      <Steps />
      <Form />
      <Buttons />
    </Modal>
  );
}

function Steps() {
  return (
    <div className="flex justify-center gap-6">
      <Step step="Basic Info" isCurrent={true} />
      <Step step="Team Members" isCurrent={false} />
      <Step step="Starter Tasks" isCurrent={false} />
    </div>
  );
}

function Step({ step, isCurrent }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-lg overflow-hidden w-16 h-2 bg-background-secondary relative">
        <div
          className={`absolute bg-primary h-full left-0 transition-all duration-500
        ${isCurrent ? "w-full" : "w-0"}
        `}
        ></div>
      </div>
      <span className="font-medium text-[10px] text-text-primary">{step}</span>
    </div>
  );
}

function Form() {
  const {
    options: {
      isUpdated,
      isValid,
      formInputs,
      handleSubmit,
      reset,
      getValue,
      setValue,
    },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "none",
    },
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

function Buttons() {
  return (
    <div className="flex mt-auto justify-between gap-3">
      <Button color="tertiary" display="with-icon">
        <IoChevronBackOutline />
        Back
      </Button>
      <Button display="with-icon">
        Next
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
}
