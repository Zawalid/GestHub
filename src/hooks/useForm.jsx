import { InputField } from '@/components/ui';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { RULES } from '@/utils/constants';
import { objectDeepEquals } from '@/utils/helpers';
import { cloneElement, useCallback, useEffect, useMemo, useState } from 'react';

const getError = (value, rules, getValue) => {
  if (!rules) return null;

  // Required
  if (rules.required && typeof value !== 'boolean' && !value) {
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

const getRules = (name, label, type, fieldRules) => {
  return {
    required: `Please enter your ${typeof label === 'string' ? label?.toLowerCase() : name}`,
    ...(RULES[type] && RULES[type]),
    ...(fieldRules && fieldRules),
  };
};

export function useForm({ fields, defaultValues: def, gridLayout, onSubmit, submitOnEnter }) {
  const [defaultValues, setDefaultValues] = useState(def);
  const [values, setValues] = useState(def);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState(null);
  // Is form valid
  const isValid = useMemo(() => {
    return (
      fields
        .map((field) => {
          const { name, type, label } = field;
          const rules = getRules(name, label, type, field.rules);
          return getError(values?.[name], rules, getValue);
        })
        .filter((err) => err).length === 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, values]);
  // Dirty fields
  const dirtyFields = useMemo(() => {
    const dirty = {};
    Object.keys(defaultValues).forEach((key) => {
      if (
        (typeof [defaultValues[key]] === 'object' && !objectDeepEquals(values[key], defaultValues[key])) ||
        (typeof [defaultValues[key]] !== 'object' && values[key] !== defaultValues[key])
      ) {
        dirty[key] = true;
      }
    });
    return dirty;
  }, [values, defaultValues]);
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
              validate(name, e.target.value, getRules(name, label, type, rules));
              setValue(name, e.target.value);
            }}
            errorMessage={errors?.[name]?.message}
            type={type || 'text'}
            {...field}
          />
        );
      });
    return inputs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, errors, values]);

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

  // Update values and default values
  const updateValues = (values) => {
    setValues(values);
    setDefaultValues(values);
  };

  // Submit handler
  const handleSubmit = useCallback(
    (callback, resetToDefaults) => {
      onSubmit?.(values);
      typeof callback === 'function' && callback?.(values);
      resetToDefaults ? setValues(defaultValues) : setDefaultValues(values);
    },
    [defaultValues, onSubmit, values]
  );

  // Reset handler
  const reset = (callback) => {
    setValues(defaultValues);
    setErrors(null);
    typeof callback === 'function' && callback?.();
  };

  // Track if the form is updated
  useEffect(() => {
    setIsUpdated(!objectDeepEquals(values, defaultValues));
  }, [values, defaultValues]);

  // Submit form when hitting enter
  useEffect(() => {
    if (!submitOnEnter || !isValid) return;

    const onEnter = (e) => e.key === 'Enter' && handleSubmit();
    window.addEventListener('keydown', onEnter);

    return () => window.removeEventListener('keydown', onEnter);
  }, [handleSubmit, submitOnEnter, isValid]);

  return {
    Form: (
      <form
        className={`grid gap-x-5 gap-y-3 ${gridLayout ? ' md:grid-cols-2' : ''} `}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
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
      dirtyFields,
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
