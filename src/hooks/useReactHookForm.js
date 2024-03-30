import { useForm } from "react-hook-form";

export function useReactHookForm({ defaultValues, submit, mode }) {
  let defValues;
  if (defaultValues && typeof defaultValues === "function") {
    defaultValues().then((v) => (defValues = v));
  } else defValues = defaultValues;

  const {
    handleSubmit,
    reset,
    formState: {
      isDirty: isUpdated,
      errors,
      dirtyFields,
      isLoading,
      isSubmitting,
      isValid,
    },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: defaultValues,
    mode: mode || "onSubmit",
  });

  const onSubmit = () => {
    handleSubmit((data) => {
      submit(data);
      reset(data);
    })();
  };
  const onCancel = (callback) => {
    reset(defValues);
    callback?.(defValues);
  };

  return {
    control,
    isUpdated,
    errors,
    dirtyFields,
    isLoading,
    isSubmitting,
    isValid,
    setValue,
    onSubmit,
    onCancel,
    watch,
  };
}
