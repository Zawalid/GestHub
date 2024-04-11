import { useForm } from "@/hooks/useForm";

export function Summary({ projectData }) {
  const {
    options: { formInputs },
  } = useForm({
    defaultValues: projectData["Basic Info"],
    fields: [
      {
        name: "name",
        label: "Name",
        showIcon: false,
        readOnly: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        rows: "5",
        showIcon: false,
        readOnly: true,
      },
      {
        name: "startDate",
        type: "date",
        label: "Start Date",
        showIcon: false,
        readOnly: true,
      },
      {
        name: "endDate",
        type: "date",
        label: "End Date",
        showIcon: false,
        readOnly: true,
      },
    ],
  });

  const teamMembers = projectData["Team Members"];
  const tasks = projectData["Starter Tasks"];

  return (
    <div className="pr-3">
      <h2 className="text-xl text-center font-bold text-text-primary mb-2">
        Finishing Up
      </h2>
      <p className="text-sm font-medium text-text-tertiary text-center">
        Double-check everything looks OK before confirming
      </p>
      <div className="flex mt-8 gap-5 ">
        <div className="flex flex-1 flex-col gap-5">
          {formInputs["name"]}
          {formInputs["description"]}
          <div className="gap-1.5 flex flex-col">
            <label className="font-medium text-text-tertiary text-sm">
              Priority
            </label>
            <button className="dropdown-toggler hover:bg-background-secondary cursor-auto">
              {projectData["Basic Info"].priority}
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5">
          {formInputs["startDate"]}
          {formInputs["endDate"]}
          <div className="gap-1.5 flex flex-col">
            <label className="font-medium text-text-tertiary text-sm">
              Team Members
            </label>
            <button className="dropdown-toggler hover:bg-background-secondary cursor-auto">
              {teamMembers.length > 0
                ? `${teamMembers
                    .map((t) => `${t.firstName} ${t.lastName}`)
                    .join(" | ")}`
                : "No team assembled"}
            </button>
          </div>
          <div className="gap-1.5 flex flex-col">
            <label className="font-medium text-text-tertiary text-sm">
              Tasks
            </label>
            <button className="dropdown-toggler hover:bg-background-secondary cursor-auto">
              {tasks.length > 0
                ? `${tasks.length} task${tasks.length > 1 ? 's' : ''} added`
                : "No tasks added"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
