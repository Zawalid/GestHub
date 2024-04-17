import { useForm } from '@/hooks/useForm';
import { Button } from '../../components/ui';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    options: { isValid, formInputs, handleSubmit },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    fields: [
      {
        name: 'email',
        type: 'email',
        label: t('auth.login.email.label'),
      },
      {
        name: 'password',
        type: 'password',
        label: t('auth.login.password.label'),
      },
    ],
    onSubmit: async (credentials) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("userId", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token ));
          navigate("/app");
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data));
          navigate('/app');
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    gridLayout: false,
  });
  return (
    <div className='relative flex h-full w-full flex-col justify-center gap-3 p-2 md:px-10 lg:px-20  '>
      <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>{t('auth.login.title1')} </h1>
      {formInputs['email']}
      {formInputs['password']}
      <Button className={'my-4 w-full self-end'} disabled={!isValid} onClick={() => handleSubmit()}>
        {t('auth.login.submit')}
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
