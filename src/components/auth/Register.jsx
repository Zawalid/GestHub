import { useForm } from "@/hooks/useForm";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Register() {
  const { t } = useTranslation();
  const {
    Form,
    options: { handleSubmit,isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    fields: [
      {
        name: "fullName",
        label: t("auth.register.fullName.label"),
      },
      {
        name: "email",
        type: "email",
        label: t("auth.register.email.label"),
      },
      {
        name: "phone",
        label: t("auth.register.phone.label"),
      },
      {
        name: "city",
        label: t("auth.register.city.label"),
      },
      {
        name: "password",
        type: "password",
        label: t("auth.register.password.label"),
      },
      {
        name: "confirmPassword",
        type: "password",
        label: t("auth.register.confirmePassword.label"),
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: true,
  });
  return (
    <div className="relative w-full md:w-2/3 m-auto p-2 md:p-5 mt-10 flex flex-col space-y-4 ">
      <h1 className="text-text-primary text-4xl">
        {t("auth.login.title1")}{" "}
        <span className="text-secondary">{t("auth.login.title2")}</span>
      </h1>
      {Form}
      <Button className={"self-end"} disabled={!isValid} onClick={handleSubmit}>
        {t("auth.register.submit")}
      </Button>
      <p className="border-t border-border text-text-primary py-4 text-center flex gap-1 items-center justify-center">
        you have an account alraedy ?
        <Link
          to="/login"
          className=" underline text-primary font-bold cursor-pointer text-sm "
        >
          Login Now
        </Link>
      </p>
    </div>
  );
}

export default Register;
