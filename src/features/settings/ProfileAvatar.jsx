import { Button } from '@/components/ui';
import Avatar from '@/components/ui/Avatar';
import { useUploadFile } from '@/hooks/useUploadFile';

export function ProfileAvatar({ avatar, onChange, disabled, name = 'Image' }) {
  const { openFilePicker } = useUploadFile({ onChange });

  return (
    <div className='grid grid-cols-[7rem_auto] items-center gap-5'>
      {/* <img
        className={`h-28 w-28  border border-border text-center text-xs text-text-tertiary ${
          name === 'Image' ? 'rounded-full object-cover' : 'rounded-lg object-contain'
        }`}
        src={avatar?.src || (name === 'Image' ? '/images/default-profile.jpg' : '/SVG/logo.svg')}
        // src={avatar || "/images/default-profile.jpg"}
        alt={name}
      /> */}
      <Avatar className='h-28 w-28' custom={{ avatar: avatar?.src }} alt={name} />
      <div>
        <div className='flex w-fit flex-wrap gap-x-5 gap-y-2'>
          <Button
            type='outline'
            className='min-w-[132px] flex-1 disabled:text-text-disabled disabled:hover:bg-background-disabled md:min-w-max'
            disabled={disabled}
            onClick={openFilePicker}
          >
            Change {name}
          </Button>
          <Button
            color='delete'
            className='min-w-[132px] flex-1 md:min-w-max'
            disabled={disabled || !avatar?.src}
            onClick={() => onChange({ src: null, file: null })}
            // onClick={() => onChange(null)}
          >
            Remove {name}
          </Button>
        </div>

        <p className='mb-1 mt-3 text-xs text-text-tertiary'>At least 80x80 px recommended.</p>
        <p className='text-xs text-text-tertiary'>JPG or PNG or JPEG are allowed (Max size of 5MB)</p>
      </div>
    </div>
  );
}
