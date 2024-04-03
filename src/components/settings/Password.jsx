import { useForm } from "@/hooks/useForm-Bug";
import { ModalFormLayout } from "@/layouts/ModalFormLayout";

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
        confirmPassword: true,
        passwordField: "newPassword",
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: false,
  });

  const { control, isUpdated, isSubmitting, isValid, onSubmit, onCancel } =
    formOption;

  return (
    <ModalFormLayout
      submitButton={{
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
    </ModalFormLayout>
  );
}
