import { useForm } from "@/hooks/useForm";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const {
    options: { isValid, formInputs, handleSubmit },
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
    <div className=" grid grid-cols-1 md:grid-cols-[1fr,1fr]  h-full w-full">
      <div className=" hidden md:flex  relative justify-center items-center bg-gradient-to-l from-background-tertiary -background-primary h-full ">
        <img src="/SVG/login.svg" className="w-2/3" alt="" />
      </div>
      <div className="relative w-full h-full p-2 flex flex-col justify-center md:px-10 lg:px-20  rounded-xl md:bg-gradient-to-r from-background-tertiary -background-primary border-3 border-black ">
        <h1 className="text-text-primary text-4xl my-10">
          {t("auth.login.title1")}{" "}
          <span className="text-secondary">{t("auth.login.title2")}</span>
        </h1>
        {formInputs["email"]}
        {formInputs["password"]}
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
    </div>
  );
}

export default Login;
