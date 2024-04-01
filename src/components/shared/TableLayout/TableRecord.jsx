import { Modal } from "@/components/ui";
import { useForm } from "@/hooks/useForm";
import { ModalFormLayout } from "@/layouts/ModalFormLayout";
import { useTable } from ".";

export function TableRecord() {
  const { formOptions: options } = useTable();

  const {
    defaultValues,
    fields,
    isOpen,
    submitButtonText,
    heading,
    resetToDefault,
    close,
  } = options;

  const { formOption, FormInputs } = useForm({
    defaultValues,
    fields,
    submit: (data) => options.onSubmit(data),
  });

  const { control, isValid, onSubmit, onCancel } = formOption;

  return (
    <Modal
      isOpen={isOpen}
      className="p-5 sm:w-3/4 lg:w-1/2 md:border  sm:h-fit"
      closeOnBlur={false}
    >
      <div className="flex items-center">
        <h1 className="text-text-primary font-bold text-2xl mb-6">{heading}</h1>
      </div>
      <ModalFormLayout
        submitButton={{
          text: submitButtonText,
          onClick: () => onSubmit(close, { resetToDefault }),
          disabled: !isValid,
        }}
        cancelButton={{ onClick: () => onCancel(close) }}
        control={control}
      >
        <FormInputs />
      </ModalFormLayout>
    </Modal>
  );
}
