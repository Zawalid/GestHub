import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';
import { toast } from 'sonner';

const defaultOptions = {
  type: 'Image',
  accept: ['.png', '.jpg', '.jpeg', '.svg'],
  readAs: 'DataURL',
  maxFiles: 1,
  maxFileSize: 5,
  minHeight: 80,
  minWidth: 80,
};

export function useUploadFile({ options = defaultOptions, onChange, onError }) {
  const accept = (options.accept || defaultOptions.accept).map((type) => type.replace('.', ''));
  const { openFilePicker } = useFilePicker({
    accept: options.accept || defaultOptions.accept,
    readAs: options.readAs || defaultOptions.readAs,
    validators: [
      new FileAmountLimitValidator({
        max: options.maxFiles || defaultOptions.maxFiles,
      }),
      new FileTypeValidator([...accept, ...accept.map((type) => type.toUpperCase())]),
      new FileSizeValidator({
        maxFileSize: (options.maxFileSize || defaultOptions.maxFileSize) * 1024 * 1024 /* To MB */,
      }),
      new ImageDimensionsValidator({
        minHeight: options.minHeight || defaultOptions.minHeight,
        minWidth: options.minWidth || defaultOptions.minWidth,
      }),
    ],
    onFilesRejected: ({ errors }) => {
      console.log(errors);
      errors.forEach((error) => {
        toast.error(
          getErrorMessage(
            error.name,
            options.type || defaultOptions.type,
            options.accept || defaultOptions.accept,
            options.maxFileSize || defaultOptions.maxFileSize,
            options.maxFiles || defaultOptions.maxFiles
          )
        );
      });
      onError?.(errors);
    },
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      onChange({ src: filesContent[0].content, file: plainFiles[0] });
      // onChange(filesContent[0].content);
    },
  });

  return { openFilePicker,options };
}

function getErrorMessage(error, type, accept, maxFileSize, maxFiles, maxWidth, maxHeight) {
  switch (error) {
    case 'FileTypeError':
      return `Only ${accept.map((type) => type.replace('.', '')).join(', ')} are allowed`;
    case 'ImageDimensionError':
      return `Image must be at least ${maxWidth}x${maxHeight} px`;
    case 'FileSizeError':
      return `${type} must be at most ${maxFileSize} MB`;
    case 'FileAmountLimitError':
      return `Only ${maxFiles === 1 ? 'one' : maxFiles} ${type.toLowerCase()} is allowed`;
    default:
      return 'Something went wrong';
  }
}
