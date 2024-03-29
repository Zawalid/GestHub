import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";
import { toast } from "sonner";
import { Controller, useWatch } from "react-hook-form";
import { Button } from "../../ui";

export function UploadImage({ control, onChange, disabled }) {
  const image = useWatch({ control, name: "image" }) || {};
  const { openFilePicker } = useFilePicker({
    accept: [".png", ".jpg"],
    readAs: "DataURL",
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "png"]),
      new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 /* 10 MB */ }),
      new ImageDimensionsValidator({
        minHeight: 100,
        minWidth: 100,
      }),
    ],
    onFilesRejected: ({ errors }) => {
      errors.forEach((error) => {
        toast.error(getErrorMessage(error.name));
      });
    },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      onChange({
        src: filesContent[0].content,
        file: plainFiles[0],
      });
    },
  });

  return (
    <div className="flex items-center gap-5">
      <img
        className="h-28 w-28 rounded-full border border-border text-center text-xs text-text-tertiary "
        src={image?.src}
        alt="profile image"
      />
      <div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Button
            type="outline"
            className="flex-1"
            disabled={disabled}
            onClick={openFilePicker}
          >
            Change Image
          </Button>
          <Button
            type="delete"
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

function getErrorMessage(name) {
  switch (name) {
    case "FileTypeError":
      return "Only JPG and PNG are allowed";
    case "ImageDimensionError":
      return "Image must be at least 100x100 px";
    case "FileSizeError":
      return "Image must be at most 10 MB";
    default:
      return "Something went wrong";
  }
}
