/* eslint-disable react-refresh/only-export-components */
import { InputField } from '@/components/ui';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { RULES } from '@/utils/constants';
import { filterObject, objectDeepEquals } from '@/utils/helpers';
import { cloneElement, isValidElement, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

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
  const [errors, setErrors] = useState({});
  // Is Form Valid
  const isValid = useMemo(() => {
    return (
      fields
        ?.map((field) => {
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
    if (!defaultValues) return dirty;
    Object.keys(defaultValues).forEach((key) => {
      if (
        (typeof [defaultValues[key]] === 'object' && !objectDeepEquals(values[key], defaultValues[key])) ||
        (typeof [defaultValues[key]] !== 'object' && values[key] !== defaultValues[key])
      ) {
        dirty[key] = values[key];
      }
    });
    return dirty;
  }, [values, defaultValues]);
  // Form Inputs
  const formInputs = useMemo(() => {
    const inputs = {};
    fields
      ?.filter((field) => !field.hidden)
      .forEach((field) => {
        const { name, type, placeholder, label, rules, customComponent, format } = field;

        inputs[name] = customComponent ? (
          <Custom Component={customComponent} {...{ field, setValue, getValue }} />
        ) : (
          <Input
            key={name}
            placeholder={placeholder || label}
            value={format?.(values?.[name]) || values?.[name] || ''}
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

  // Get a field value (Must be 'function' for hoisting)
  function getValue(name) {
    return values?.[name];
  }

  // Set a field value
  function setValue(name, value) {
    return setValues((prev) => ({ ...prev, [name]: value }));
  }

  // Update values and default values
  const updateValues = (values) => {
    setValues(values);
    setDefaultValues(values);
  };

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

  // Submit handler
  const handleSubmit = useCallback(
    (callback, resetToDefaults) => {
      fields?.forEach((field) => {
        const { name, type, label } = field;
        const rules = getRules(name, label, type, field.rules);
        validate(name, values[name], rules);
      });

      if (!isValid) {
        const firstError = fields.filter((f) => Object.keys(errors).includes(f.name)).map((f) => f.name)[0];
        firstError && toast.error(errors[firstError]?.message);
        return;
      }

      onSubmit?.(values);
      typeof callback === 'function' && callback?.(values);
      resetToDefaults ? setValues(defaultValues) : setDefaultValues(values);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultValues, fields, onSubmit, values]
  );

  // Reset handler
  const reset = (callback) => {
    setValues(defaultValues);
    setErrors(null);
    typeof callback === 'function' && callback?.();
  };

  // Track if the form is updated
  useEffect(() => {
    const updated = !objectDeepEquals(values, defaultValues);
    setIsUpdated(updated);
    !updated && setErrors({});
  }, [values, defaultValues]);

  // Submit form when hitting enter
  useEffect(() => {
    if (!submitOnEnter) return;

    const onEnter = (e) => e.key === 'Enter' && handleSubmit();
    window.addEventListener('keydown', onEnter);

    return () => window.removeEventListener('keydown', onEnter);
  }, [handleSubmit, submitOnEnter]);

  return {
    Form: (
      <form
        className={`grid gap-x-5 gap-y-3 ${gridLayout ? 'md:grid-cols-2' : ''} `}
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
      isValid,
      isUpdated,
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

const Input = ({ type, name, ...props }) => {
  const filteredProps = filterObject(props, ['format', 'rules'], 'exclude');
  
  return type === 'password' ? (
    <PasswordInput {...filteredProps} />
  ) : (
    <InputField {...filteredProps} name={name} type={type} />
  );
};

const Custom = ({ Component, ...props }) =>
  isValidElement(Component) ? cloneElement(Component, props) : Component(props);
