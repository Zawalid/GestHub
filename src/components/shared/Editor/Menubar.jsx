import { cloneElement, useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaCode,
  FaHeading,
  FaParagraph,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';
import { FaTextSlash, FaLinkSlash, FaLink } from 'react-icons/fa6';
import { GoHorizontalRule } from 'react-icons/go';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { Button, DropDown, InputField, ToolTip } from '@/components/ui';

const render = (buttons, size) => {
  return buttons.map(({ toolTip, icon, disabled, onClick, active, custom }, i) => {
    if (custom) return cloneElement(custom, { key: i });
    return (
      <ToolTip key={toolTip} content={toolTip}>
        <Button
          onClick={onClick}
          disabled={disabled}
          state={active ? 'active' : 'not-active '}
          shape='icon'
          size={size}
        >
          {icon}
        </Button>
      </ToolTip>
    );
  });
};
const AddLink = ({ editor, size }) => {
  const [url, setUrl] = useState('');

  const handleSetLink = (url) => {
    // cancelled
    if (url === null) return;
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSetLink(url);
    setUrl('');
  };
  return (
    <ToolTip
      content={
        <div className='relative'>
          <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2.5'>
            <InputField
              label='Add Link'
              placeholder='https://example.com'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button size='small' color='secondary' onClick={() => handleSubmit} disabled={!/^https?:\/\//.test(url)}>
              Add
            </Button>
          </form>
        </div>
      }
      trigger='click'
      interactive={true}
      arrow={true}
      placement='bottom'
    >
      <Button
        disabled={!editor.can().chain().focus().toggleLink().run()}
        shape='icon'
        size={size}
        state={editor.isActive('link') ? 'active' : 'not-active'}
        onClick={() => setUrl(editor.isActive('link') ? editor.getAttributes('link').href : '')}
      >
        <FaLink />
      </Button>
    </ToolTip>
  );
};
const Headings = ({ editor, size }) => {
  return (
    <DropDown
      options={{ className: 'w-fit' }}
      toggler={
        <ToolTip content='Heading'>
          <Button shape='icon' state={editor.isActive('heading') ? 'active' : 'not-active'} size={size}>
            <FaHeading />
          </Button>
        </ToolTip>
      }
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <DropDown.Option
          key={i}
          size='small'
          isCurrent={editor.isActive('heading', { level: i + 1 })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: i + 1 })
              .run()
          }
        >
          <span className='items- flex'>
            <FaHeading size={14} />
            <span className='text-[10px] font-bold'>{i + 1}</span>
          </span>
        </DropDown.Option>
      ))}
    </DropDown>
  );
};

export default function Menubar({ editor, size }) {
  if (!editor) return null;

  const buttons = [
    {
      toolTip: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      icon: <FaBold />,
    },
    {
      toolTip: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      icon: <FaItalic />,
    },
    {
      toolTip: 'Strike',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
      icon: <FaStrikethrough />,
    },
    {
      toolTip: 'Underline',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
      icon: <FaUnderline />,
    },
    {
      toolTip: 'Code',
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
      icon: <FaCode />,
    },
    {
      custom: <AddLink editor={editor} size={size} />,
    },
    {
      toolTip: 'Unlink',
      onClick: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
      active: editor.isActive('link'),
      icon: <FaLinkSlash />,
    },
    {
      custom: <Headings editor={editor} size={size} />,
    },
    {
      toolTip: 'Paragraph',
      onClick: () => editor.chain().focus().setParagraph().run(),
      active: editor.isActive('paragraph'),
      icon: <FaParagraph />,
    },
    {
      toolTip: 'Bullets',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
      icon: <FaListUl />,
    },
    {
      toolTip: 'Numbered',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
      icon: <FaListOl />,
    },
    {
      toolTip: 'Blockquote',
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive('blockquote'),
      icon: <FaQuoteRight />,
    },
    {
      toolTip: 'Horizontal Rule',
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      icon: <GoHorizontalRule />,
    },
    {
      toolTip: 'Align Left',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      active: editor.isActive({ textAlign: 'left' }),
      icon: <FaAlignLeft />,
    },
    {
      toolTip: 'Align Center',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      active: editor.isActive({ textAlign: 'center' }),
      icon: <FaAlignCenter />,
    },
    {
      toolTip: 'Align Right',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      active: editor.isActive({ textAlign: 'right' }),
      icon: <FaAlignRight />,
    },
    {
      toolTip: 'Clear Content',
      onClick: () => editor.commands.clearContent(),
      icon: <FaTextSlash />,
    },
    {
      custom: (
        <div className='flex gap-2 flex-1 justify-end'>
          {render(
            [
              {
                toolTip: 'Undo',
                onClick: () => editor.chain().undo().run(),
                disabled: !editor.can().chain().undo().run(),
                icon: <GrUndo />,
              },
              {
                toolTip: 'Redo',
                onClick: () => editor.chain().redo().run(),
                disabled: !editor.can().chain().redo().run(),
                icon: <GrRedo />,
              },
            ],
            size
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='flex w-full flex-wrap gap-2 border-b border-border p-2 transition-[inset] duration-300'>
      {render(buttons, size)}
    </div>
  );
}

export function CustomBubbleMenu({ editor }) {
  if (!editor) return null;

  const buttons = [
    {
      toolTip: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      icon: <FaBold />,
    },
    {
      toolTip: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      icon: <FaItalic />,
    },
    {
      toolTip: 'Strike',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
      icon: <FaStrikethrough />,
    },
    {
      toolTip: 'Underline',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
      icon: <FaUnderline />,
    },
    {
      toolTip: 'Code',
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
      icon: <FaCode />,
    },
    {
      custom: <AddLink editor={editor} />,
    },
    {
      toolTip: 'Unlink',
      onClick: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
      active: editor.isActive('link'),
      icon: <FaLinkSlash />,
    },
    {
      custom: <Headings editor={editor} />,
    },
  ];

  return <div className='flex items-center gap-2 '> {render(buttons)}</div>;
}
