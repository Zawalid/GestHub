import { useSelector } from "react-redux";
import { ProfileImage } from "./ProfileImage";
import { useForm } from "@/hooks/useForm";
import { ModalFormLayout } from "@/layouts/ModalFormLayout";

export default function Profile() {
  const user = useSelector((state) => state.user) || {};

  const { formOption, FormInputs } = useForm({
    defaultValues: {
      image: {
        src: user.image,
        file: null,
      },
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
    },
    fields: [
      {
        name: "firstName",
        label: "First Name",
      },
      {
        name: "lastName",
        label: "Last Name",
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
      },
      {
        name: "phone",
        label: "Phone Number",
      },
      {
        name: "birthday",
        type: "date",
        label: "Birthday",
      },
    ],
    submit: (data) => console.log(data),
  });

  const {
    control,
    isUpdated,
    isLoading,
    isSubmitting,
    isValid,
    setValue,
    onSubmit,
    onCancel,
  } = formOption;

  return (
    <ModalFormLayout
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
          <ProfileImage
            onChange={(image) =>
              setValue("image", image, { shouldDirty: true })
            }
            control={control}
            disabled={isLoading || isSubmitting}
          />
        </div>

        <FormInputs/>
      </div>
    </ModalFormLayout>
  );
}
