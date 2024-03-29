import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Tab } from "./Tab";
import { InputField } from "../../ui";
import { UploadImage } from "./UploadImage";

export default function Profile() {
  const user = useSelector((state) => state.user) || {};

  const {
    handleSubmit,
    reset,
    formState: { isDirty: isUpdated, errors, isLoading, isSubmitting, isValid },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      image: {
        src: user.image,
      },
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      CIN: user.CIN,
    },
    mode: "onChange",
  });

  const getProps = (name, type, label, field) => ({
    name,
    type: type || "text",
    placeholder: label,
    value: field.value || "",
    disabled: isLoading || isSubmitting,
    label,
    errorMessage: errors?.[name]?.message,
    ...field,
  });

  return (
    <Tab
      saveButton={{
        onClick: handleSubmit((data) => {
          console.log(data);
        }),
        disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: () =>
          reset({
            image: {
              src: user.image,
            },
            name: user.name,
            email: user.email,
            phone: user.phone,
            CIN: user.CIN,
          }),
        disabled: !isUpdated || !isValid,
      }}
      control={control}
    >
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 font-bold text-text-secondary">Image</h3>
          <UploadImage
            onChange={(image) =>
              setValue("image", image, { shouldDirty: true })
            }
            control={control}
            disabled={isLoading || isSubmitting}
          />
        </div>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputField
              {...getProps("firstName", "text", "First Name", field)}
            />
          )}
          rules={{
            required: "Please enter your first name",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputField {...getProps("lastName", "text", "Last Name", field)} />
          )}
          rules={{
            required: "Please enter your last name",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...getProps("email", "email", "Email Address", field)}
            />
          )}
          rules={{
            required: "Please enter your email address",
            pattern: {
              value: /^\+212[5-7]\d{8}$/,
              message: "Invalid email address",
            },
          }}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputField {...getProps("phone", "text", "Phone Number", field)} />
          )}
          rules={{
            required: "Please enter your phone number",
            pattern: {
              value: /^(\+212\s)?(05|06|07)\d{8}$/,
              message:
                "Invalid phone number format. \n Ex: +212 0637814207 or 0637814207",
            },
            maxLength: {
              value: 13,
              message: "Phone number must be at most 13 characters long",
            },
          }}
        />
        <Controller
          name="CIN"
          control={control}
          render={({ field }) => (
            <InputField {...getProps("CIN", "text", "CIN", field)} />
          )}
          rules={{
            required: "Please enter your CIN",
            pattern: {
              value: /^[A-Za-z]{1,2}\d{5,6}$/,
              message: "Invalid CIN",
            },
            maxLength: {
              value: 8,
              message: "CIN must be at most 8 characters long",
            },
          }}
        />
      </div>
    </Tab>
  );
}
