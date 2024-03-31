import { PiX } from "react-icons/pi";
import { useForm } from "../../hooks/useForm";
import { Button, Modal } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login({ isOpen, onClose,openRegister }) {
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
        name: "email",
        type: "email",
        label: t("auth.login.email.label"),
      },
      {
        name: "password",
        type: "password",
        label: t("auth.login.password.label"),
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: false,
  });
  return (
    <Modal isOpen={isOpen} className={"w-full pt-10 md:pt-0 h-full md:w-3/4 lg:w-1/2  md:h-fit"}>
      <div className="relative flex flex-col  p-10">
        <Button
          className="absolute right-2 top-2"
          onClick={onClose}
          shape="icon"
          size="small"
        >
          <PiX />
        </Button>
        <h1 className="text-text-primary text-4xl my-10">
          {t("auth.login.title1")}{" "}
          <span className="text-secondary">{t("auth.login.title2")}</span>
        </h1>
        <FormInputs />
        <p  className=" underline text-text-secondary cursor-pointer text-sm mt-4" onClick={() => {
            onClose(false);
            openRegister(true)
        }} >Vous navez pas de compte</p>
        <Link to='/app'>
          <Button className={'self-end my-4'} onClick={onSubmit}>{t("auth.login.submit")}</Button>
        </Link>
      </div>
    </Modal>
  );
}

export default Login;
