import { Modal } from '@/components/ui';
import { useForm } from '@/hooks/index';
import { RULES } from '@/utils/constants';

export default function NewDemand() {
  const {
    Form,
    options: { isUpdated, isValid, formInputs, getValue, setValue, handleSubmit, reset },
  } = useForm({
    defaultValues: {
      firstName: 'Walid',
      lastName: 'Zakan',
      offer: 'Front End Developer',
      endDate: '',
      password: '',
    },
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        readOnly: true,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        readOnly: true,
      },
      {
        name: 'offer',
        label: 'Offer',
        placeholder: 'Offer',
        readOnly: true,
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
        rules: { ...RULES.endDate },
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: true,
  });
  return (
    <Modal isOpen={true} className='min-h-[500px] p-5 md:h-fit md:w-[650px] md:border' closeOnBlur={false}>
      <h1 className='mb-5 text-2xl font-bold text-text-primary'>Internship Application</h1>
      {Form}
      <div className='flex flex-col gap-2 mt-3'>
        <label className='text-sm font-medium text-text-tertiary'>CV</label>
      </div>
    </Modal>
  );
}
