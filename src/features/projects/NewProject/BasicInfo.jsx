import { DropDown } from "@/components/ui/DropDown";
import { useForm } from "@/hooks/useForm";
import { useEffect } from "react";

// Steps
export function BasicInfo({ updateStatus, updateState, step }) {
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
    updateStatus?.(isValid ? "completed" : "uncompleted");
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
