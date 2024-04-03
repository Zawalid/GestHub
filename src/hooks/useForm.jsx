import { InputField } from "@/components/ui";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { objectDeepEquals } from "@/utils/helpers";
import { useEffect, useState } from "react";

const getError = (value, rules) => {
  if (!rules) return null;

  // Required
  if (rules.required && !value) {
    const required = rules.required;
    return {
      type: "required",
      message: typeof required === "boolean" ? null : required,
    };
  }
  // Pattern
  if (rules.pattern && value) {
    const pattern = new RegExp(rules.pattern.value);
    if (!pattern.test(value)) {
      return {
        type: "pattern",
        message: rules.pattern?.message,
      };
    }
  }
  // Min Length
  if (rules.minLength && value) {
    if (value.length < rules.minLength.value) {
      return {
        type: "minLength",
        message: rules.minLength?.message,
      };
    }
  }
  // Max Length
  if (rules.maxLength && value) {
    if (value.length > rules.maxLength.value) {
      return {
        type: "maxLength",
        message: rules.maxLength?.message,
      };
    }
  }
  // Min
  if (rules.min && value) {
    if (Number(value) < rules.min.value) {
      return {
        type: "min",
        message: rules.min?.message,
      };
    }
  }
  // Max
  if (rules.max && value) {
    if (Number(value) > rules.max.value) {
      return {
        type: "max",
        message: rules.max?.message,
      };
    }
  }
  // Custom validation
  if (rules.validate && value) {
    const validate = rules.validate(value);
    if (validate !== true)
      return {
        type: "validate",
        message: validate,
      };
  }

  return null;
};

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

const getRules = (
  name,
  type,
  fieldRules,
  isConfirmPassword,
  passwordFieldValue
) => {
  return {
    required: `Please enter your ${name}`,
    ...(rules[name] && rules[name]),
    ...(rules[type] && rules[type]),
    ...(fieldRules && fieldRules),
    ...(isConfirmPassword && {
      validate: (pass) =>
        pass === passwordFieldValue || "Passwords don't match",
    }),
  };
};

export function useForm({ fields, defaultValues, gridLayout, onSubmit }) {
  const [form, setForm] = useState({
    defaultValues,
    values: defaultValues,
    isUpdated: false,
    errors: null,
    isValid: false,
  });

  // Effects
  // Compute the isValid based  errors object
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      isValid:
        fields
          .map((field) => {
            return getError(
              form.values[field.name],
              getRules(
                field.name,
                field.type,
                field.rules,
                field.isConfirmPassword,
                form.values[field.passwordField]
              )
            );
          })
          .filter((err) => err).length === 0,
    }));
  }, [fields, form.values]);

  // Update the values based on defaultValues
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      values: defaultValues,
    }));
  }, [defaultValues]);

  // Compute the isUpdated value based on the equality of values and defaultValues

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      isUpdated: !objectDeepEquals(form.values, form.defaultValues),
    }));
  }, [form.values, form.defaultValues]);

  // Handlers
  // Add errors
  const setErrors = (errors) => {
    setForm((prev) => ({
      ...prev,
      errors,
    }));
  };
  // Validate fields
  const validate = (name, value, rules) => {
    const err = getError(value, rules);
    const errors = { ...form.errors };
    if (!err) delete errors[name];
    else errors[name] = err;

    setErrors(errors);
  };
  // Get a field value
  const getValue = (name) => form.values[name];

  // Set a field value
  const setValue = (name, value) => {
    setForm((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));
  };
  // Submit handler
  const handleSubmit = (callback) => {
    onSubmit?.(form.values);
    callback?.(form.values);
    setForm((prev) => ({ ...prev, defaultValues: form.values }));
  };

  // Reset handler
  const reset = (callback) => {
    setForm((prev) => ({ ...prev, values: form.defaultValues }));
    setErrors(null);
    callback?.();
  };

  return {
    Form: (
      <form
        className={`grid gap-y-3 gap-x-5 ${
          gridLayout ? " md:grid-cols-2" : ""
        } `}
      >
        {fields.map((field) => {
          const {
            name,
            type,
            placeholder,
            label,
            rules,
            isConfirmPassword,
            passwordField,
          } = field;
          return (
            <Input
              key={name}
              type={type || "text"}
              placeholder={placeholder || label}
              value={form.values[name] || ""}
              onChange={(e) => {
                validate(
                  name,
                  e.target.value,
                  getRules(
                    name,
                    type,
                    rules,
                    isConfirmPassword,
                    form.values[passwordField]
                  )
                );
                setValue(name, e.target.value);
              }}
              label={label}
              errorMessage={form.errors?.[name]?.message}
            />
          );
        })}
      </form>
    ),
    options: {
      ...form,
      handleSubmit,
      reset,
      getValue,
      setValue,
    },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
const Input = ({ type, ...props }) =>
  type === "password" ? (
    <PasswordInput {...props} />
  ) : (
    <InputField {...props} type={type} />
  );
