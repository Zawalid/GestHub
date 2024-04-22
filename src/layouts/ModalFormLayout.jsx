import { Button } from '@/components/ui';

export function ModalFormLayout({ children, submitButton, cancelButton,className='' }) {
  return (
    <>
      <div className={`flex-1 overflow-auto pr-2 ${className}`}>{children}</div>
      <div className='mt-5 flex justify-end gap-3'>
        {cancelButton && (
          <Button color='tertiary' {...cancelButton}>
            {cancelButton.text || 'Cancel'}
          </Button>
        )}
        <Button {...submitButton}>{submitButton.text || 'Save Changes'}</Button>
      </div>
    </>
  );
}
