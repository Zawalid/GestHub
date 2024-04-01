import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button, Modal } from "@/components/ui";
import { useForm } from "@/hooks/useForm";
import { ModalFormLayout } from "@/layouts/ModalFormLayout";
import { useTable } from ".";

export function NewRecord() {
  const [isOpen, setIsOpen] = useState(false);
  const { onAdd } = useTable();
  const { formOption, FormInputs } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
    },
    fields: [
      {
        name: "firstName",
        label: "First Name",
      },
      {
        name: "lastName",
        label: "Last Name",
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
      },
      {
        name: "phone",
        label: "Phone Number",
      },
      {
        name: "birthday",
        label: "Birthday",
        type : "date"
      },
      {
        name: "password",
        type: "password",
        label: " Password",
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirm  Password",
        confirmPassword: true,
        passwordField: "password",
      },
    ],
    submit: (data) => onAdd(data),
  });

  const { control, isUpdated, isValid, onSubmit, onCancel } = formOption;
  return (
    <>
      <Button display="with-icon" onClick={() => setIsOpen(true)}>
        <FaPlus />
        New Intern
      </Button>

      <Modal
        isOpen={isOpen}
        className="p-5 sm:w-3/4 lg:w-1/2 md:border  sm:h-fit"
        closeOnBlur={false}
      >
        <div className="flex items-center">
          <h1 className="text-2xl mb-6">Add New Intern</h1>
        </div>
        <ModalFormLayout
          saveButton={{
            text: "Add Intern",
            onClick: () => onSubmit(setIsOpen(false), { resetToDefault: true }),
            disabled: !isUpdated || !isValid,
          }}
          cancelButton={{ onClick: () => onCancel(setIsOpen(false)) }}
          control={control}
        >
          <FormInputs />
        </ModalFormLayout>
      </Modal>
    </>
  );
}
