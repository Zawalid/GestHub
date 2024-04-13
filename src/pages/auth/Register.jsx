import { useForm } from '@/hooks/useForm';
import { Button, DropDown } from '../../components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MdOutlineSchool } from 'react-icons/md';

export function Register() {
  const { t } = useTranslation();
  const {
    options: { isValid, formInputs, handleSubmit, getValue, setValue },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    fields: [
      {
        name: 'fullName',
        label: t('auth.register.fullName.label'),
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
        name: 'city',
        label: t('auth.register.city.label'),
      },
      {
        name: 'password',
        type: 'password',
        label: t('auth.register.password.label'),
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: t('auth.register.confirmePassword.label'),
        rules: { validate: (pass, getValue) => pass === getValue('password') || "Passwords don't match" },
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: true,
  });
  const levels = ['Bac+1', 'Bac+2', 'Bac+3', 'Master'];
  return (
    <div className="relative m-auto mt-10 flex w-full flex-col space-y-4 p-2 md:w-3/4 md:p-5 lg:w-2/3 ">
      <h1 className="text-4xl text-text-primary">
        {t('auth.login.title1')} <span className="text-secondary">{t('auth.login.title2')}</span>
      </h1>
      <div className="grid grid-cols-1 gap-2 gap-x-4 md:grid-cols-2">
        {formInputs.fullName}
        {formInputs.email}
        {formInputs.phone}
        {formInputs.city}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-tertiary">Niveau Scolaire</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className="relative  flex items-center gap-3 ps-7  capitalize ">
                  <span className=" absolute -left-2 z-10 rounded-l-lg bg-background-tertiary px-[5px] py-[6px] text-text-tertiary">
                    <MdOutlineSchool className="text-lg" />
                  </span>
                  <span className="absolute">{levels.at(getValue('NiveauScolaire'))}</span>
                </span>
              </DropDown.Toggler>
            }
          >
            {levels.map((e, i) => (
              <DropDown.Option
                key={e}
                className="capitalize"
                onClick={() => setValue('NiveauScolaire', i)}
                isCurrent={e === levels.at(getValue('NiveauScolaire'))}
              >
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
        {formInputs['password']}
        {formInputs['confirmPassword']}
      </div>

      <Button className={'self-end'} disabled={!isValid} onClick={handleSubmit}>
        {t('auth.register.submit')}
      </Button>
      <p className="flex items-center justify-center gap-1 border-t border-border py-4 text-center text-text-primary">
        you have an account alraedy ?
        <Link to="/login" className=" cursor-pointer text-sm font-bold text-primary underline ">
          Login Now
        </Link>
      </p>
    </div>
  );
}

