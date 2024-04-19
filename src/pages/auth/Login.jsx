import { useForm } from '@/hooks/useForm';
import { Button } from '../../components/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useUser';

export function Login() {
  const { t } = useTranslation();
  const { login, isLogging } = useLogin();

  const {
    Form,
    options: { isValid, handleSubmit },
  } = useForm({
    defaultValues: { email: '', password: '' },
    fields: [
      { name: 'email', type: 'email', label: t('auth.login.email.label') },
      { name: 'password', type: 'password', label: t('auth.login.password.label') },
    ],
    onSubmit: login,
  });

  return (
    <div className='relative flex h-full w-full flex-col justify-center gap-3 p-2 md:px-10 lg:px-20  '>
      <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>{t('auth.login.title1')}</h1>

      {Form}

      <Button className={'my-4 w-full self-end'} disabled={!isValid} onClick={handleSubmit} isLoading={isLogging}>
        {isLogging ? 'Logging In...' : t('auth.login.submit')}
      </Button>

      <p className='flex items-center justify-center gap-1 border-t border-border py-4 text-center text-text-primary'>
        Don&apos;t have an account ?
        <Link to='/register' className='ml-2 font-bold text-primary underline'>
          Register
        </Link>
      </p>
    </div>
  );
}
