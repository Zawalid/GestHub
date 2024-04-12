import { InputField } from '@/components/ui';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { objectDeepEquals } from '@/utils/helpers';
import { cloneElement, useEffect, useMemo, useState } from 'react';

const getError = (value, rules, getValue) => {
  if (!rules) return null;

  // Required
  if (rules.required && !value) {
    const required = rules.required;
    return {
      type: 'required',
      message: typeof required === 'boolean' ? null : required,
    };
  }
  // Pattern
  if (rules.pattern && value) {
    const pattern = new RegExp(rules.pattern.value);
    if (!pattern.test(value)) {
      return {
        type: 'pattern',
        message: rules.pattern?.message,
      };
    }
  }
  // Min Length
  if (rules.minLength && value) {
    if (value.length < rules.minLength.value) {
      return {
        type: 'minLength',
        message: rules.minLength?.message,
      };
    }
  }
  // Max Length
  if (rules.maxLength && value) {
    if (value.length > rules.maxLength.value) {
      return {
        type: 'maxLength',
        message: rules.maxLength?.message,
      };
    }
  }
  // Min
  if (rules.min && value) {
    if (Number(value) < rules.min.value) {
      return {
        type: 'min',
        message: rules.min?.message,
      };
    }
  }
  // Max
  if (rules.max && value) {
    if (Number(value) > rules.max.value) {
      return {
        type: 'max',
        message: rules.max?.message,
      };
    }
  }
  // Custom validation
  if (rules.validate && value) {
    const validate = rules.validate(value, getValue);
    if (validate !== true)
      return {
        type: 'validate',
        message: validate,
      };
  }

  return null;
};

const rules = {
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s)?(05|06|07)\d{8}$/,
      message: 'Invalid phone number format. \n Ex: +212 0637814207 or 0637814207',
    },
  },
  password: {
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/,
      message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
    },
  },
};

const getRules = (name, type, fieldRules) => {
  return {
    required: `Please enter your ${name}`,
    ...(rules[name] && rules[name]),
    ...(rules[type] && rules[type]),
    ...(fieldRules && fieldRules),
  };
};

export function useForm({ fields, defaultValues: def, gridLayout, onSubmit }) {
  const [defaultValues, setDefaultValues] = useState(def);
  const [values, setValues] = useState(def);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState(null);
  // Is form valid
  const isValid = useMemo(() => {
    return (
      fields
        .map((field) => {
          const rules = getRules(field.name, field.type, field.rules);
          return getError(values?.[field.name], rules, getValue);
        })
        .filter((err) => err).length === 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, values]);
  // Form Inputs
  const formInputs = useMemo(() => {
    const inputs = {};
    fields
      .filter((field) => !field.hidden)
      .forEach((field) => {
        const { name, type, placeholder, label, rules } = field;

        inputs[name] = (
          <Input
            placeholder={placeholder || label}
            value={values?.[name] || ''}
            onChange={(e) => {
              validate(name, e.target.value, getRules(name, type, rules));
              setValue(name, e.target.value);
            }}
            errorMessage={errors?.[name]?.message}
            {...field}
          />
        );
      });
    return inputs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, errors, values]);

  useEffect(() => {
    setIsUpdated(!objectDeepEquals(values, defaultValues));
  }, [values, defaultValues]);

  // Validate fields
  const validate = (name, value, rules) => {
    const err = getError(value, rules, getValue);
    setErrors((prev) => {
      const errors = { ...prev };
      if (!err) delete errors[name];
      else errors[name] = err;

      return errors;
    });
  };
  // Get a field value (Must be 'function' for hoisting)
  function getValue(name) {
    return values?.[name];
  }

  // Set a field value
  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const updateValues = (values) => {
    setValues(values);
    setDefaultValues(values);
  };
  // Submit handler
  const handleSubmit = (callback, resetToDefaults) => {
    onSubmit?.(values);
    typeof callback === 'function' && callback?.(values);
    resetToDefaults ? setValues(defaultValues) : setDefaultValues(values);
  };

  // Reset handler
  const reset = (callback) => {
    setValues(defaultValues);
    setErrors(null);
    callback?.();
  };

  return {
    Form: (
      <form
        className={`grid gap-x-5 gap-y-3 ${gridLayout ? ' md:grid-cols-2' : ''} `}
        onSubmit={(e) => e.preventDefault()}
      >
        {Object.keys(formInputs).map((key) => {
          return cloneElement(formInputs[key], { key });
        })}
      </form>
    ),
    options: {
      isUpdated,
      isValid,
      errors,
      values,
      defaultValues,
      formInputs,
      handleSubmit,
      reset,
      getValue,
      setValue,
      updateValues,
    },
  };
}

// eslint-disable-next-line react-refresh/only-export-components
const Input = ({ type, name, ...props }) =>
  type === 'password' ? <PasswordInput {...props} /> : <InputField {...props} name={name} type={type} />;
