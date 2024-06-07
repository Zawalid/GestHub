import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { useTable } from './useTable';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { useMutationState } from '@tanstack/react-query';

export function Actions({ onUpdate, onDelete, row, actions }) {
  const { showForm, confirmOptions, resourceName, rows, onPrevPage, formOptions } = useTable();
  const navigate = useNavigateWithQuery();
  const { openModal } = useConfirmationModal();
  const variables = useMutationState({
    filters: { mutationKey: [`${resourceName.toLocaleLowerCase()}s`], status: 'pending' },
    select: (mutation) => mutation.state.variables,
  })?.[0];

  const defaultActions = {
    view: {
      text: 'View',
      icon: <IoEyeOutline />,
      onClick: () => navigate(row.id),
    },
    edit: {
      text: 'Edit',
      icon: <MdDriveFileRenameOutline />,
      onClick: () => {
        showForm({
          fields: formOptions.fields.map((field) =>
            field.name.includes('password') ? { ...field, rules: { ...field.rules, required: false } } : field
          ),
          defaultValues: { ...formOptions.defaultValues, ...row },
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
        });
      },
    },
    delete: {
      text: 'Delete',
      icon: <IoTrashOutline />,
      onClick: () => {
        openModal({
          ...confirmOptions,
          onConfirm: () => {
            onDelete(row.profile_id || row.id);
            rows?.length === 1 && onPrevPage();
          },
        });
      },
    },
  };

  const getActions = () => {
    if (typeof actions === 'function') return actions(defaultActions);
    if (Array.isArray(actions)) return actions;
    if (actions === 'defaultActions') return Object.values(defaultActions);
    return [];
  };

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      togglerDisabled={(() => {
        console.log(variables);
        if (!variables) return false;
        const id = row.profile_id || row.id;
        if ((Array.isArray(variables) && variables.includes(id)) || variables.id === id || variables === id)
          return true;
      })()}
    >
      {getActions()
        .filter((action) => !action.hidden?.(row))
        .map((action) => (
          <DropDown.Option
            key={action.text}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(row);
            }}
          >
            {action.icon}
            {action.text}
          </DropDown.Option>
        ))}
    </DropDown>
  );
}

