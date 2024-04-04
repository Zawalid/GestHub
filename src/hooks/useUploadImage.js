import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";
import { toast } from "sonner";

const defaultOptions = {
  accept: [".png", ".jpg"],
  readAs: "DataURL",
  maxImages: 1,
  maxFileSize: 10,
  minHeight: 100,
  minWidth: 100,
};

export function useUploadImage({
  options = defaultOptions,
  onChange,
  onError,
}) {
  const { openFilePicker } = useFilePicker({
    accept: options.accept || defaultOptions.accept,
    readAs: options.readAs || defaultOptions.readAs,
    validators: [
      new FileAmountLimitValidator({
        max: options.maxImages || defaultOptions.maxImages,
      }),
      new FileTypeValidator(["jpg", "png"]),
      new FileSizeValidator({
        maxFileSize:
          (options.maxFileSize || defaultOptions.maxFileSize) *
          1024 *
          1024 /* To MB */,
      }),
      new ImageDimensionsValidator({
        minHeight: options.minHeight || defaultOptions.minHeight,
        minWidth: options.minWidth || defaultOptions.minWidth,
      }),
    ],
    onFilesRejected: ({ errors }) => {
      console.log(errors);
      errors.forEach((error) => {
        toast.error(getErrorMessage(error.name));
      });
      onError?.(errors);
    },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      // onChange({ src: filesContent[0].content, file: plainFiles[0] });
      onChange(filesContent[0].content);
    },
  });

  return { openFilePicker };
}

function getErrorMessage(name) {
  switch (name) {
    case "FileTypeError":
      return "Only JPG and PNG are allowed";
    case "ImageDimensionError":
      return "Image must be at least 100x100 px";
    case "FileSizeError":
      return "Image must be at most 10 MB";
    case "FileAmountLimitError":
      return "Only one image is allowed";
    default:
      return "Something went wrong";
  }
}
