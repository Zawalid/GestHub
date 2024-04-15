import { useForm } from "@/hooks/useForm";
import { Button } from "../../components/ui";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    onSubmit: async (credentials) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data ));
          navigate("/app");
        } else {
          console.log("errrrrrrrr");
        }
      } catch (err) {
        console.log(err);
      }
    },
    gridLayout: false,
  });
  return (
    <div className="relative w-full h-full p-2 flex flex-col justify-center md:px-10 lg:px-20  ">
      <h1 className="text-text-primary text-xl my-10">
        {t("auth.login.title1")}{" "}
      </h1>
      {formInputs["email"]}
      {formInputs["password"]}
      <Button
        className={"self-end my-4 w-full"}
        disabled={!isValid}
        onClick={() => handleSubmit()}
      >
        {t("auth.login.submit")}
      </Button>
      <p className=" border-t border-border text-text-primary py-4 text-center flex gap-1 items-center justify-center">
        Dont have an account ?
        <Link to="/register" className="underline text-primary font-bold">
          Register Now
        </Link>
      </p>
    </div>
  );
}

