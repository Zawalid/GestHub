import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { useTable } from '.';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

export function Actions({ onUpdate, onDelete, row, actions }) {
  const { showForm, confirmOptions, resourceName, rows, onPrevPage } = useTable();
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useConfirmationModal();

  const defaultActions = [
    {
      text: 'View',
      icon: <IoEyeOutline />,
      onClick: () => navigate(`${location.pathname}/${row.id}`),
    },
    {
      text: 'Edit',
      icon: <MdDriveFileRenameOutline />,
      onClick: () =>
        showForm({
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
        }),
    },
  ];

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoEllipsisHorizontalSharp />
        </Button>
      }
    >
      {(actions || defaultActions).map((action) => (
        <DropDown.Option key={action.text} onClick={() => action.onClick(row.profile_id || row.id)}>
          {action.icon}
          {action.text}
        </DropDown.Option>
      ))}

      <DropDown.Option
        onClick={() =>
          openModal({
            ...confirmOptions,
            onConfirm: () => {
              onDelete(row.profile_id || row.id);
              rows?.length === 1 && onPrevPage();
            },
          })
        }
      >
        <IoTrashOutline />
        Delete
      </DropDown.Option>
    </DropDown>
  );
}
