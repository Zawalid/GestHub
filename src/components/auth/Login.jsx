import { useForm } from "@/hooks/useForm";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const {
    Form,
    options: { handleSubmit, isValid },
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
    onSubmit: (data) => console.log(data),
    gridLayout: false,
  });
  return (
    <div className="relative w-full md:w-[40%] m-auto mt-10 h-full p-2  flex flex-col   rounded-xl ">
      <h1 className="text-text-primary text-4xl my-10">
        {t("auth.login.title1")}{" "}
        <span className="text-secondary">{t("auth.login.title2")}</span>
      </h1>
      {Form}
      <Link to="/app">
        <Button
          className={"self-end my-4 w-full"}
          disabled={!isValid}
          onClick={(e) => handleSubmit(console.log(e))}
        >
          {t("auth.login.submit")}
        </Button>
      </Link>
      <p className=" border-t border-border text-text-primary py-4 text-center flex gap-1 items-center justify-center">
        Dont have an account ?
        <Link
          to="/register"
          className=" underline text-primary font-bold cursor-pointer text-sm "
        >
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default Login;
