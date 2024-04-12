import { DropDown } from '@/components/ui/DropDown';
import { useForm } from '@/hooks/useForm';
import { DateTime } from 'luxon';
import { useEffect } from 'react';

export function BasicInfo({ updateStatus, updateState, state }) {
  const today = DateTime.now().toISODate();
  const {
    options: { isValid, formInputs, values, getValue, setValue },
  } = useForm({
    defaultValues: state || {},
    fields: [
      {
        name: 'name',
        label: 'Name',
        placeholder: "Project's Name",
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: "Project's description",
        rows: '5',
        rules: { required: false },
      },
      {
        name: 'priority',
        hidden: true,
      },
      {
        name: 'startDate',
        type: 'date',
        label: 'Start Date',
        min: today,
      },
      {
        name: 'endDate',
        type: 'date',
        label: 'End Date',
        min: today,
        rules: {
          validate: (val, getValue) => {
            return (
              DateTime.fromISO(val) > DateTime.fromISO(getValue('startDate')) || 'End date must be after start date'
            );
          },
        },
      },
    ],
    gridLayout: true,
    // onSubmit,
  });

  useEffect(() => {
    updateStatus?.(isValid ? 'completed' : 'uncompleted');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  useEffect(() => {
    updateState?.(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div className="flex h-full w-full flex-col gap-5 mobile:flex-row mobile:items-center">
      <div className="flex flex-1 flex-col gap-5">
        {formInputs['name']}
        {formInputs['description']}
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {formInputs['startDate']}
        {formInputs['endDate']}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-tertiary">Priority</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span>{getValue('priority')}</span>
              </DropDown.Toggler>
            }
          >
            {['None', 'High', 'Medium', 'Small'].map((e) => (
              <DropDown.Option key={e} onClick={() => setValue('priority', e)} isCurrent={e === getValue('priority')}>
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
      </div>
    </div>
  );
}
