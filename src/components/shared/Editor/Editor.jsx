import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import '@/styles/Editor.css';
import Menubar, { CustomBubbleMenu } from './Menubar';
import { useFullScreen } from '@/hooks/useFullScreen';

export default function Editor({
  readOnly,
  placeholder,
  size,
  bubbleMenu,
  fullScreen = true,
  content,
  onUpdate = (content) => console.log(content),
}) {
  const { element, toggler } = useFullScreen();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: placeholder || 'Start writing...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
        autolink: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none flex-1 p-2 text-text-primary',
      },
    },
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  return (
    <div
      className='tiptap relative flex h-full flex-1 flex-col gap-1 overflow-auto rounded-lg border border-border bg-background-primary'
      ref={element}
    >
      {readOnly || <Menubar editor={editor} size={size} />}
      <EditorContent editor={editor} />
      {bubbleMenu && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 300,
            theme: 'bubbleMenu',
            interactive: true,
            arrow: false,
          }}
        >
          <CustomBubbleMenu editor={editor} />
        </BubbleMenu>
      )}
      {fullScreen && toggler}
    </div>
  );
}
