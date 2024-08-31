import Editor, { useEditorOptions } from '@/components/shared/Editor/Editor';
import { Button } from '@/components/ui';
import { useSettings, useUpdateSettings } from './useSettings';

export default function About() {
  const { settings } = useSettings();
  const {
    content: about,
    setContent: setAbout,
    isChanged,
    handleCancel,
    setEditorInstance,
  } = useEditorOptions(settings?.aboutDescription);

  const { mutate } = useUpdateSettings();

  return (
    <div className='flex flex-1 flex-col gap-2 overflow-auto' style={{ paddingInline: '20px' }}>
      <Editor
        className='flex-1'
        content={about}
        onUpdate={(text) => setAbout(text)}
        bubbleMenu={true}
        setEditorInstance={setEditorInstance}
      />
      <div className='flex justify-end gap-3'>
        <Button disabled={!isChanged} color='tertiary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={!isChanged} onClick={() => mutate({ aboutDescription: about })}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
