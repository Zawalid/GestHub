import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { useTable } from ".";

export function NewRecord({ onAdd }) {
  const { showForm, isLoading, resourceName,formOptions } = useTable();

  return (
    <Button
      display="with-icon"
      className="text-nowrap"
      onClick={() =>
        showForm({
          isOpen: true,
          onSubmit: onAdd,
          defaultValues : formOptions.defaultValues,
          heading: `Add New ${resourceName}`,
          submitButtonText: `Add ${resourceName}`,
        })
      }
      disabled={isLoading}
    >
      <FaPlus />
      {`New ${resourceName}`}
    </Button>
  );
}
