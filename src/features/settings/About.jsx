import Editor, { isContentEmpty } from '@/components/shared/Editor/Editor';
import { Button } from '@/components/ui';
import { useSettings, useUpdateSettings } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

export default function About() {
  const { settings } = useSettings();
  const [about, setAbout] = useState(settings?.aboutDescription || '<p></p>');
  const [editorInstance, setEditorInstance] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const { mutate } = useUpdateSettings();

  useEffect(() => {
    setIsChanged(() => {
      const isDifferent = about !== (settings?.aboutDescription || '<p></p>');
      if ((isContentEmpty(about) && isDifferent) || isDifferent) return true;
      return false;
    });
  }, [about, settings?.aboutDescription]);

  const handleCancel = () => {
    setAbout(settings?.aboutDescription || '<p></p>');
    if (editorInstance) editorInstance.commands.setContent(settings?.aboutDescription || '');
  };

  return (
    <div className='flex flex-1 flex-col gap-2 overflow-auto' style={{ paddingInline: '20px' }}>
      <Editor
        className='flex-1'
        onUpdate={(text) => setAbout(text)}
        bubbleMenu={true}
        content={about}
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
