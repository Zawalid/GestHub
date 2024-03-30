import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { Tab } from "./Tab";
import { DropDown } from "../ui";
import { UploadImage } from "./UploadImage";
import { useForm } from "../../hooks/useForm";

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
      CIN: user.CIN,
      birthday: user.birthday,
      sex: user.sex,
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
        name: "CIN",
        label: "CIN",
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
    watch,
  } = formOption;

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
          <UploadImage
            onChange={(image) =>
              setValue("image", image, { shouldDirty: true })
            }
            control={control}
            disabled={isLoading || isSubmitting}
          />
        </div>

        <FormInputs />

        <div className=" flex flex-col gap-1.5">
          <label className="font-medium text-text-tertiary text-sm">Sex</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className="capitalize">{watch("sex")}</span>
              </DropDown.Toggler>
            }
            options={{ className: "w-28" }}
            togglerClassName="w-fit"
          >
            {["male", "female"].map((sex) => (
              <DropDown.Option
                key={sex}
                isCurrent={sex === watch("sex")}
                onClick={() => setValue("sex", sex, { shouldDirty: true })}
              >
                <span className="capitalize">{sex}</span>
              </DropDown.Option>
            ))}
          </DropDown>

          <Controller
            control={control}
            name="sex"
            render={({ field }) => <input {...field} type="hidden" />}
          />
        </div>
      </div>
    </Tab>
  );
}
