import { Modal } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useTable } from '.';
import { useEffect } from 'react';

export function TableRecord() {
  const { formOptions } = useTable();

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
    type,
  } = formOptions;

  const {
    Form,
    options: { isUpdated, isValid, dirtyFields, handleSubmit, reset, updateValues },
  } = useForm({
    defaultValues,
    fields,
    gridLayout,
    onSubmit: (data) => onSubmit(type === 'create' ? data : dirtyFields),
  });

  useEffect(() => {
    updateValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <Modal isOpen={isOpen} className='p-5 sm:h-5/6 sm:w-3/4 md:h-fit md:border  lg:w-1/2' closeOnBlur={false}>
      <div className='flex items-center'>
        <h1 className='mb-6 text-2xl font-bold text-text-primary'>{heading}</h1>
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
