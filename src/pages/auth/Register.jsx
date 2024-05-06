import { useForm } from '@/hooks/useForm';
import { Button, CheckBox, DropDown } from '../../components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MdOutlineSchool } from 'react-icons/md';
import { useRegister } from '@/hooks/useUser';
import { LEVELS, RULES } from '@/utils/constants';
import { Radio } from '@/components/ui/Radio';

export function Register() {
  const { t } = useTranslation();
  const { register, isRegistering } = useRegister();

  const {
    options: { isValid, formInputs, handleSubmit, getValue, setValue },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      establishment: '',
      academicLevel: 'Bac+2',
      password: '',
      password_confirmation: '',
      accept: null,
    },
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'email',
        type: 'email',
        label: t('auth.register.email.label'),
      },
      {
        name: 'phone',
        label: t('auth.register.phone.label'),
      },
      {
        name: 'establishment',
        label: 'Establishment',
        type: 'establishment',
      },
      {
        name: 'academicLevel',
        hidden: true,
        type: 'academicLevel',
      },
      {
        name: 'password',
        type: 'password',
        label: t('auth.register.password.label'),
      },
      {
        name: 'password_confirmation',
        type: 'password',
        label: t('auth.register.confirmPassword.label'),
        rules: { ...RULES.passwordConfirmation },
      },
      { name: 'accept', hidden: true },
    ],
    onSubmit: register,
    submitOnEnter: true,
  });

  return (
    <div className='relative flex h-full w-full flex-col justify-center space-y-6 p-2 md:p-5 '>
      <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>{t('auth.register.title1')} </h1>
      <div className='grid grid-cols-1 gap-2 gap-x-4 lg:grid-cols-2'>
        {formInputs.firstName}
        {formInputs.lastName}
        {formInputs.email}
        {formInputs.phone}
        {formInputs.establishment}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-text-tertiary'>Academic Level</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className='relative  flex items-center gap-3 ps-7  capitalize '>
                  <span className=' absolute -left-2 z-10 rounded-l-lg bg-background-tertiary px-[5px] py-[6px] text-text-tertiary'>
                    <MdOutlineSchool className='text-lg' />
                  </span>
                  <span className='absolute'>{getValue('academicLevel')}</span>
                </span>
              </DropDown.Toggler>
            }
          >
            {LEVELS.map((e) => (
              <DropDown.Option
                key={e}
                className='capitalize'
                onClick={() => setValue('academicLevel', e)}
                isCurrent={e === getValue('academicLevel')}
              >
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
        <div className='col-span-2 flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-text-tertiary'>Gender</label>
          <div className='flex gap-3'>
            <div className='flex items-center gap-3'>
              <Radio
                name='gender'
                checked={getValue('gender') === 'Male'}
                onChange={(e) => setValue('gender', e.target.checked && 'Male')}
              />
              <label className='text-sm font-medium text-text-tertiary'>Male</label>
            </div>
            <div className='flex items-center gap-3'>
              <Radio
                name='gender'
                checked={getValue('gender') === 'Female'}
                onChange={(e) => setValue('gender', e.target.checked && 'Female')}
              />
              <label className='text-sm font-medium text-text-tertiary'>Female</label>
            </div>
          </div>
        </div>
        {formInputs['password']}
        {formInputs['password_confirmation']}
      </div>

      <div className='mt-5 flex items-center gap-3'>
        <CheckBox checked={getValue('accept')} onChange={(e) => setValue('accept', e.target.checked || null)} />
        <label className='text-sm font-medium text-text-tertiary'>
          Accept the terms of information access law{' '}
          <a
            href='https://www.oc.gov.ma/sites/default/files/loi%2031-13/1.%20BO%20Loi%2031.13%20en%20francais.pdf'
            className='font-bold text-blue-500 underline ml-1'
          >
            31-13
          </a>
        </label>
      </div>

      <Button className={'w-full'} disabled={!isValid} isLoading={isRegistering} onClick={handleSubmit}>
        {isRegistering ? 'Registering...' : t('auth.register.submit')}
      </Button>
      <p className='flex items-center justify-center gap-1 border-t border-border py-4 text-center text-text-primary'>
        Already have an account ?
        <Link to='/login' className='ml-2 cursor-pointer text-sm font-bold text-primary underline '>
          Login
        </Link>
      </p>
    </div>
  );
}
