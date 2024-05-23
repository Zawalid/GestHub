import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/components/ui';
import { useTable } from './useTable';

export function NewRecord({ onAdd, component }) {
  const { showForm, resourceName, formOptions, formFields, disabled,  } = useTable();


  if (component)
    return component(() =>
      showForm({
        isOpen: true,
        onSubmit: onAdd,
        fields: formFields,
        defaultValues: formOptions.defaultValues,
        heading: `New ${resourceName}`,
        submitButtonText: `Add ${resourceName}`,
        type: 'create',
      })
    );
  return (
    <Button
      display='with-icon'
      className='text-nowrap'
      onClick={() => {
        showForm({
          isOpen: true,
          onSubmit: onAdd,
          defaultValues: formOptions.defaultValues,
          heading: `New ${resourceName}`,
          submitButtonText: `Add ${resourceName}`,
        });
      }}
      disabled={disabled}
    >
      <FaPlus />
      {`New ${resourceName}`}
    </Button>
  );
}
