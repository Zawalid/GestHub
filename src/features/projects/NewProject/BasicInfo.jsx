import { DropDown } from '@/components/ui/DropDown';
import { useForm } from '@/hooks/useForm';
import { RULES } from '@/utils/constants';
import { useEffect } from 'react';
import { UsersDropDown } from './StarterTasks';
import { useSupervisors } from '@/hooks/index';

export function BasicInfo({ updateStatus, updateState, state, onSubmit, className, actionButtons }) {
  const { supervisors } = useSupervisors();
  const {
    options: { isValid, isUpdated, formInputs, values, getValue, setValue, handleSubmit, reset },
  } = useForm({
    defaultValues: state || {},
    fields: [
      {
        name: 'subject',
        label: 'Subject',
        placeholder: 'Enter subject...',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description...',
        rows: '9',
      },
      {
        name: 'startDate',
        type: 'date',
        label: 'Start Date',
      },
      {
        name: 'endDate',
        type: 'date',
        label: 'End Date',
        rules: { ...RULES.endDate },
      },
      {
        name: 'priority',
        hidden: true,
      },

      {
        name: 'supervisor',
        hidden: true,
        rules: { validate: (val) => val !== 'Select Supervisor' || 'The supervisor is required' },
      },
    ],
    onSubmit,
  });

  useEffect(() => {
    updateStatus?.(isValid ? 'completed' : 'uncompleted');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  useEffect(() => {
    updateState?.(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  console.log( getValue('supervisor'))

  return (
    <>
      <div className={`flex h-full w-full flex-col gap-5 ${className}`}>
        <div className='flex flex-col gap-5 mobile:flex-1'>
          {formInputs['subject']}
          {formInputs['description']}
        </div>
        <div className='flex flex-col gap-5 mobile:flex-1'>
          {formInputs['startDate']}
          {formInputs['endDate']}
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Priority</label>
            <DropDown
              toggler={
                <DropDown.Toggler>
                  <span>{getValue('priority')}</span>
                </DropDown.Toggler>
              }
            >
              {['None', 'High', 'Medium', 'Low'].map((e) => (
                <DropDown.Option key={e} onClick={() => setValue('priority', e)} isCurrent={e === getValue('priority')}>
                  {e}
                </DropDown.Option>
              ))}
            </DropDown>
          </div>
          <UsersDropDown
            users={supervisors}
            name='Supervisor'
            defaultVal='Select Supervisor'
            value={
              typeof getValue('supervisor') === 'number'
                ? supervisors?.find((s) => s.id === getValue('supervisor'))
                : getValue('supervisor')
            }
            setValue={(data) => setValue('supervisor', data)}
          />
        </div>
      </div>
      {actionButtons && actionButtons({ handleSubmit, reset, isUpdated, isValid })}
    </>
  );
}
