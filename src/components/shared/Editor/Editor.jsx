import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import '@/styles/Editor.css';
import Menubar, { CustomBubbleMenu } from './Menubar';
import { useFullScreen } from '@/hooks/useFullScreen';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { useEffect, useState } from 'react';

export default function Editor({
  readOnly,
  placeholder,
  size,
  bubbleMenu,
  className,
  fullScreen = true,
  content,
  onUpdate,
  setEditorInstance,
  visibleButtons,
}) {
  const { element, toggler } = useFullScreen({ size });

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
      TextStyle,
      Color,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none flex-1 p-2 text-text-primary',
      },
    },
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && setEditorInstance) {
      setEditorInstance(editor);
    }
  }, [editor, setEditorInstance]);

  return (
    <div
      className={`tiptap relative flex h-full flex-1 flex-col gap-1 overflow-auto rounded-lg border border-border bg-background-primary ${className}`}
      ref={element}
    >
      {readOnly || <Menubar editor={editor} size={size} visibleButtons={visibleButtons} />}
      <EditorContent editor={editor} />
      {bubbleMenu && editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 300,
            theme: 'bubbleMenu',
            interactive: true,
            arrow: false,
          }}
        >
          <CustomBubbleMenu size={size} editor={editor} />
        </BubbleMenu>
      )}
      {fullScreen && toggler}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEditorOptions = (oldContent) => {
  const [content, setContent] = useState(oldContent || '<p></p>');
  const [editorInstance, setEditorInstance] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const handleCancel = (callback) => {
    setContent(oldContent || '<p></p>');
    if (editorInstance) editorInstance.commands.setContent(oldContent || '');
    if (callback) callback();
  };

  const isContentEmpty = (content) => {
    if (!content) return true;
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent.trim() === '';
  };

  useEffect(() => {
    setIsChanged(() => {
      const isDifferent = content !== (oldContent || '<p></p>');
      if ((isContentEmpty(content) && isDifferent) || isDifferent) return true;
      return false;
    });
  }, [content, oldContent]);

  return {
    content,
    setContent,
    editorInstance,
    setEditorInstance,
    isChanged,
    handleCancel,
  };
};
