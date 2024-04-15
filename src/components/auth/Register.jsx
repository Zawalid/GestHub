import { useForm } from "@/hooks/useForm";
import { Button, DropDown } from "../ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";

function Register() {
  const { t } = useTranslation();
  const {
    options: { isValid, formInputs, handleSubmit, getValue, setValue },
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
  const levels = ["Bac+1", "Bac+2", "Bac+3", "Master"];
  return (
    <div className="relative w-full p-2 md:p-5 flex flex-col justify-center h-full space-y-6 ">
      <h1 className="text-text-primary text-4xl">{t("auth.login.title1")} </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-2">
        {formInputs.fullName}
        {formInputs.email}
        {formInputs.phone}
        {formInputs.city}
        <div className="gap-1.5 flex flex-col">
          <label className="font-medium text-text-tertiary text-sm">
            Niveau Scolaire
          </label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className="capitalize  flex relative items-center ps-7  gap-3 ">
                  <span className=" bg-background-tertiary py-[6px] px-[5px] text-text-tertiary z-10 -left-2 rounded-l-lg absolute">
                    <MdOutlineSchool className="text-lg" />
                  </span>
                  <span className="absolute">
                    {levels.at(getValue("NiveauScolaire"))}
                  </span>
                </span>
              </DropDown.Toggler>
            }
          >
            {levels.map((e, i) => (
              <DropDown.Option
                key={e}
                className="capitalize"
                onClick={() => setValue("NiveauScolaire", i)}
                isCurrent={e === levels.at(getValue("NiveauScolaire"))}
              >
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
        {formInputs["password"]}
        {formInputs["confirmPassword"]}
      </div>

      <Button
        className={"self-end w-full lg:w-min"}
        disabled={!isValid}
        onClick={handleSubmit}
      >
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
