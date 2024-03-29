import { Controller } from "react-hook-form";
import { Tab } from "./Tab";
import { useReactHookForm } from "../../hooks/useReactHookForm";
import { PasswordInput } from "../ui/PasswordInput";

export default function Password() {
  const {
    control,
    isUpdated,
    isSubmitting,
    isValid,
    errors,
    onSubmit,
    onCancel,
    watch,
  } = useReactHookForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
    submit: (data) => console.log(data),
  });

  const passwordRules = {
    required: "Please enter your password",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    },
  };

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
      <div className="space-y-5">
        <div>
          <Controller
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <PasswordInput
                id="currentPassword"
                placeholder="Current password"
                label="Current password"
                errorMessage={errors?.currentPassword?.message}
                {...field}
              />
            )}
            rules={passwordRules}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <PasswordInput
                id="newPassword"
                placeholder="New password"
                label="New password"
                errorMessage={errors?.newPassword?.message}
                {...field}
              />
            )}
            rules={passwordRules}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field }) => (
              <PasswordInput
                id="confirmNewPassword"
                placeholder="Confirm new password"
                label="Confirm new password"
                errorMessage={errors?.confirmNewPassword?.message}
                {...field}
              />
            )}
            rules={{
              ...passwordRules,
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
          />
        </div>
      </div>
    </Tab>
  );
}
