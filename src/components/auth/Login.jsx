import { PiX } from "react-icons/pi";
import { useForm } from "../../hooks/useForm";
import { Button, Modal } from "../ui";
import { useTranslation } from "react-i18next";

function Login({ isOpen, onClose }) {
    const {t} =useTranslation()
  const {
    formOption: { onSubmit },
    FormInputs,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    fields: [
      {
        name: "email",
        type: "email",
        label: t('auth.login.email.label'),
      },
      {
        name: "password",
        type: "password",
        label: t('auth.login.password.label'),
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: false,
  });
  return (
    <Modal isOpen={isOpen} className={"w-full h-full md:w-1/2  md:h-fit"}>
      <div className="relative flex flex-col  p-10 space-y-4 ">
        <button
          className="icon-button absolute right-2 top-2 not-active small text-text-tertiary"
          onClick={onClose}
        >
          <PiX />
        </button>
        <h1 className="text-text-primary text-4xl">
          {t('auth.login.title1') } <span className="text-secondary">{t('auth.login.title2') }</span>
        </h1>
        <FormInputs />
        <Button onClick={onSubmit}>{t('auth.login.submit') }</Button>
      </div>
    </Modal>
  );
}

export default Login;
