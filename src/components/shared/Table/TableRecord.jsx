import { Modal } from "@/components/ui";
import { useForm } from "@/hooks/useForm";
import { ModalFormLayout } from "@/layouts";
import { useTable } from ".";
import { useEffect } from "react";

export function TableRecord() {
  const { formOptions: options } = useTable();

  const {
    defaultValues,
    fields,
    isOpen,
    submitButtonText,
    heading,
    resetToDefault,
    gridLayout,
    onSubmit,
    close,
  } = options;

  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset, updateValues },
  } = useForm({
    defaultValues,
    fields,
    gridLayout,
    onSubmit,
  });

  useEffect(() => {
    updateValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

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
          disabled: !isValid || !isUpdated,
          onClick: () => handleSubmit(close, { resetToDefault }),
        }}
        cancelButton={{ onClick: () => reset(close) }}
      >
        {Form}
      </ModalFormLayout>
    </Modal>
  );
}
