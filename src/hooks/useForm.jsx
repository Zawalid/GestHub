import { Controller } from "react-hook-form";
import { InputField } from "../components/ui";
import { useForm as useF } from "react-hook-form";
import { PasswordInput } from "../components/ui/PasswordInput";
import { forwardRef } from "react";

const rules = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s)?(05|06|07)\d{8}$/,
      message:
        "Invalid phone number format. \n Ex: +212 0637814207 or 0637814207",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/,
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    },
  },
};

export function useForm({ fields, defaultValues, submit, gridLayout = true }) {
  const {
    handleSubmit,
    reset,
    formState: { isDirty, errors, isLoading, isSubmitting, isValid },
    control,
    setValue,
    watch,
  } = useF({
    defaultValues,
    mode: "all",
  });

  const onSubmit = (callback, { resetToDefault = false }) => {
    handleSubmit((data) => {
      submit(data);
      reset(resetToDefault ? defaultValues : data);
      callback?.(data);
    })();
  };
  const onCancel = (callback) => {
    reset(defaultValues);
    callback?.(defaultValues);
  };

  const getRules = (name, type, fieldRules, confirmPassword, passwordField) => {
    return {
      required: `Please enter your ${name}`,
      ...(rules[name] && rules[name]),
      ...(rules[type] && rules[type]),
      ...(fieldRules && fieldRules),
      ...(confirmPassword && {
        validate: (pass) =>
          pass === watch(passwordField) || "Passwords don't match",
      }),
    };
  };

  if (!fields) return null;

  return {
    formOption: {
      control,
      isUpdated: isDirty,
      isLoading,
      isSubmitting,
      isValid,
      errors,
      setValue,
      onSubmit,
      onCancel,
      watch,
    },
    FormInputs: ({ children }) => (
      <div
        className={`grid gap-y-3 gap-x-5 ${
          gridLayout ? " md:grid-cols-2" : ""
        } `}
      >
        {fields.map((field) => {
          const {
            name,
            type,
            rules,
            label,
            placeholder,
            confirmPassword,
            passwordField,
          } = field;
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <Input
                  name={name}
                  type={type || "text"}
                  placeholder={placeholder || label}
                  value={field.value || ""}
                  disabled={isLoading || isSubmitting}
                  label={label}
                  errorMessage={errors?.[name]?.message}
                  {...field}
                />
              )}
              rules={getRules(
                name,
                type,
                rules,
                confirmPassword,
                passwordField
              )}
            />
          );
        })}
        {children}
      </div>
    ),
  };
}

// eslint-disable-next-line react-refresh/only-export-components
const Input = forwardRef(({ type, ...props }, ref) =>
  type === "password" ? (
    <PasswordInput {...props} ref={ref} />
  ) : (
    <InputField {...props} type={type} ref={ref} />
  )
);

Input.displayName = "Input";
