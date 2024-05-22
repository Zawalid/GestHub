import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { useTable } from '.';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export function Actions({ onUpdate, onDelete, row, actions }) {
  const { showForm, confirmOptions, resourceName, rows, onPrevPage, formOptions, isSelecting } = useTable();
  const navigate = useNavigateWithQuery();
  const { openModal } = useConfirmationModal();

  const defaultActions = [
    {
      text: 'View',
      icon: <IoEyeOutline />,
      onClick: () => navigate(row.id),
      hidden: () => ['Supervisor', 'Admin'].includes(resourceName),
    },
    {
      text: 'Edit',
      icon: <MdDriveFileRenameOutline />,
      onClick: () =>
        showForm({
          fields: formOptions.fields.map((field) =>
            field.name.includes('password') ? { ...field, rules: { ...field.rules, required: false } } : field
          ),
          defaultValues: row,
          onSubmit: (data) => onUpdate({ id: row.profile_id, data }),
          isOpen: true,
          submitButtonText: 'Save Changes',
          heading: (
            <>
              Update {resourceName} <span className='text-primary'>#</span>
              {row.id}
            </>
          ),
          type: 'update',
        }),
    },
  ];

  const deleteAction = actions?.find((a) => a.text === 'Delete');

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      togglerDisabled={isSelecting}
    >
      {(actions || defaultActions)
        .filter((action) => !action.hidden?.(row) && action.text !== 'Delete')
        .map((action) => (
          <DropDown.Option key={action.text} onClick={() => action.onClick(row.profile_id || row.id)}>
            {action.icon}
            {action.text}
          </DropDown.Option>
        ))}
      {!deleteAction?.hidden?.(row) && (
        <DropDown.Option
          onClick={() =>
            deleteAction?.onClick?.() ||
            openModal({
              ...confirmOptions,
              onConfirm: () => {
                onDelete(row.profile_id || row.id);
                rows?.length === 1 && onPrevPage();
              },
            })
          }
        >
          {deleteAction?.icon || <IoTrashOutline />}
          Delete
        </DropDown.Option>
      )}
    </DropDown>
  );
}
