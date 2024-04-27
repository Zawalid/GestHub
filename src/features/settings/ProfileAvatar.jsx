import { Button } from "@/components/ui";
import { useUploadFile } from "@/hooks/useUploadFile";

export function ProfileAvatar({ avatar, onChange, disabled }) {
  const { openFilePicker } = useUploadFile({ onChange });

  return (
    <div className="grid grid-cols-[7rem_auto] items-center gap-5">
      <img
        className="h-28 w-28 object-cover rounded-full border border-border text-center text-xs text-text-tertiary "
        src={avatar?.src || "/images/default-profile.jpg"}
        // src={avatar || "/images/default-profile.jpg"}
        alt="profile avatar"
      />
      <div>
        <div className="flex w-fit flex-wrap gap-x-5 gap-y-2">
          <Button
            type="outline"
            className="flex-1 min-w-[132px] md:min-w-max disabled:hover:bg-background-disabled disabled:text-text-disabled"
            disabled={disabled}
            onClick={openFilePicker}
          >
            Change Image
          </Button>
          <Button
            color="delete"
            className="flex-1 min-w-[132px] md:min-w-max"
            disabled={disabled || !avatar?.src}
            onClick={() => onChange({ src: null, file: null })}
            // onClick={() => onChange(null)}
          >
            Remove Image
          </Button>
        </div>

        <p className="mb-1 mt-3 text-xs text-text-tertiary">
          At least 80x80 px recommended.
        </p>
        <p className="text-xs text-text-tertiary">
          JPG or PNG or JPEG are allowed (Max size of 5MB)
        </p>
      </div>
    </div>
  );
}
