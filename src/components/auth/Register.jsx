import { PiX } from "react-icons/pi";
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
        label: "First Name",
      },
      {
        name: "lastName",
        label: "Last Name",
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
      },
      {
        name: "phone",
        label: "Phone Number",
      },
      {
        name: "city",
        label: "City",
      },
      {
        name: "birthday",
        type: "date",
        label: "Birthday",
      },
      {
        name: "newPassword",
        type: "password",
        label: "New Password",
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: true,
  });
  return (
    <Modal isOpen={isOpen} className={"w-full h-full md:w-3/4  md:h-fit"}>
      <div className="relative flex flex-col  p-10 space-y-4 ">
        <Button
          className="absolute right-2 top-2"
          onClick={onClose}
          shape="icon"
          size="small"
        >
          <PiX />
        </Button>
        <h1 className="text-text-primary text-4xl">
          {t("auth.login.title1")}{" "}
          <span className="text-secondary">{t("auth.login.title2")}</span>
        </h1>
        <FormInputs />
        <Button onClick={onSubmit}>{t("auth.login.submit")}</Button>
      </div>
    </Modal>
  );
}

export default Register;
