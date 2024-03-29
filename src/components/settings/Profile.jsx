import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { IoChevronDownOutline } from "react-icons/io5";
import { Tab } from "./Tab";
import { DropDown, InputField } from "../ui";
import { UploadImage } from "./UploadImage";
import { useReactHookForm } from "../../hooks/useReactHookForm";

export default function Profile() {
  const user = useSelector((state) => state.user) || {};

  const {
    control,
    isUpdated,
    isLoading,
    isSubmitting,
    isValid,
    errors,
    setValue,
    onSubmit,
    onCancel,
  } = useReactHookForm({
    defaultValues: {
      image: {
        src: user.image,
        file: null,
      },
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      CIN: user.CIN,
    },
    submit: (data) => console.log(data),
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
        onClick: onSubmit,
        disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: onCancel,
        disabled: !isUpdated || !isValid,
      }}
      control={control}
    >
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 font-bold text-text-secondary">Image</h3>
          {/* Image */}
          <UploadImage
            onChange={(image) =>
              setValue("image", image, { shouldDirty: true })
            }
            control={control}
            disabled={isLoading || isSubmitting}
          />
        </div>
        {/* firstName */}
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
        {/* lastName */}
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
        {/* email */}
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
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />
        {/* phone */}
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
        {/* CIN */}
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
        {/* sex */}
        {/* <div className=" flex gap-5 items-center">
          <label className="font-medium text-text-tertiary text-sm">Sex</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span>Male</span>
                <IoChevronDownOutline />
              </DropDown.Toggler>
            }
            options={{ className: "w-48" }}
          >
            {["Male", "Female"].map((sex) => (
              <DropDown.Option
                key={sex}
                // isCurrent={value === weekStartsOn}
                onClick={() => setValue("sex", sex, { shouldDirty: true })}
              >
                <span>{sex}</span>
              </DropDown.Option>
            ))}
          </DropDown>

          <Controller
            control={control}
            name="sex"
            render={({ field }) => <input {...field} type="hidden" />}
          />
        </div> */}
      </div>
    </Tab>
  );
}
