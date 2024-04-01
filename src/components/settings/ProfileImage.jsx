import { Controller, useWatch } from "react-hook-form";
import { Button } from "../ui";
import { useUploadImage } from "@/hooks/useUploadImage";

export function ProfileImage({ control, onChange, disabled }) {
  const image = useWatch({ control, name: "image" }) || {};
  const { openFilePicker } = useUploadImage({ onChange });

  return (
    <div className="grid grid-cols-[7rem_auto] items-center gap-5">
      <img
        className="h-28 w-28 object-cover rounded-full border border-border text-center text-xs text-text-tertiary "
        src={image?.src || "/images/default-profile.jpg"}
        alt="profile image"
      />
      <div>
        <div className="flex w-fit flex-wrap gap-x-5 gap-y-2">
          <Button
            type="outline"
            className="flex-1 min-w-[132px] md:min-w-max"
            disabled={disabled}
            onClick={openFilePicker}
          >
            Change Image
          </Button>
          <Button
            color="delete"
            className="flex-1 min-w-[132px] md:min-w-max"
            disabled={disabled || !image.src}
            onClick={() => onChange({ src: null, file: null })}
          >
            Remove Image
          </Button>
        </div>

        <p className="mb-1 mt-3 text-xs text-text-tertiary">
          At least 100x100 px recommended.
        </p>
        <p className="text-xs text-text-tertiary">
          JPG or PNG are allowed (Max size of 10MB)
        </p>
      </div>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <input type="hidden" value={field.value || {}} />
        )}
      />
    </div>
  );
}
