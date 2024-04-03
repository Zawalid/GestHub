import { useDispatch, useSelector } from "react-redux";
import { ProfileImage } from "./ProfileImage";
import { useForm } from "@/hooks/useForm";
import { ModalFormLayout } from "@/layouts/ModalFormLayout";
import { updateUser } from "@/app/reducer";

export default function Profile() {
  const user = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset, setValue, getValue },
  } = useForm({
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
    onSubmit: (data) => dispatch(updateUser(data)),
    gridLayout: true,
  });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        // disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 font-bold text-text-secondary">Image</h3>
          <ProfileImage
            image={getValue("image")}
            onChange={(image) => setValue("image", image)}
          />
        </div>

        {Form}
      </div>
    </ModalFormLayout>
  );
  return null
}
