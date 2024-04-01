import { useForm } from "../../hooks/useForm";
import { Button, Modal } from "../ui";
import { useTranslation } from "react-i18next";

function Register({ isOpen, onClose }) {
  const { t } = useTranslation();
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
        name: "firstName",
        label:  t('auth.register.firstName.label') ,
      },
      {
        name: "lastName",
        label:  t('auth.register.lastName.label') ,
      },
      {
        name: "email",
        type: "email",
        label:  t('auth.register.email.label') ,
      },
      {
        name: "phone",
        label:  t('auth.register.phone.label') ,
      },
      {
        name: "city",
        label:  t('auth.register.city.label') ,
      },
      {
        name: "birthday",
        type: "date",
        label:  t('auth.register.birthday.label') ,
      },
      {
        name: "password",
        type: "password",
        label:  t('auth.register.password.label') ,
      },
      {
        name: "confirmPassword",
        type: "password",
        label:  t('auth.register.confirmePassword.label') ,
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: true,
  });
  return (
    <Modal isOpen={isOpen} className={"w-full overflow-auto h-full md:w-3/4  md:h-fit"} onClose={onClose} closeButton={true}>
      <div className="relative flex flex-col  p-10 space-y-4 ">
        
        <h1 className="text-text-primary text-4xl">
          {t("auth.login.title1")}{" "}
          <span className="text-secondary">{t("auth.login.title2")}</span>
        </h1>
        <FormInputs />
        <Button className={'self-end'} onClick={onSubmit}>{t("auth.register.submit")}</Button>
      </div>
    </Modal>
  );
}

export default Register;
