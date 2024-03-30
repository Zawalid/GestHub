import { Tab } from "./Tab";
import { useForm } from "../useForm";

export default function Password() {
  const { formOption, FormInputs } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    fields: [
      {
        name: "currentPassword",
        type: "password",
        label: "Current Password",
      },
      {
        name: "newPassword",
        type: "password",
        label: "New Password",
      },
      {
        name: "confirmNewPassword",
        type: "password",
        label: "Confirm New Password",
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: false,
  });

  const { control, isUpdated, isSubmitting, isValid, onSubmit, onCancel } =
    formOption;

  return (
    <Tab
      saveButton={{
        text: "Change Password",
        onClick: onSubmit,
        disabled: !isUpdated || !isValid || isSubmitting,
      }}
      cancelButton={{
        onClick: onCancel,
        disabled: !isUpdated || !isValid,
      }}
      control={control}
    >
      <FormInputs />
    </Tab>
  );
}
