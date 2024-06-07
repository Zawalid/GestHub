import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { Button, Modal, ToolTip } from '@/components/ui';
import { useTable } from './useTable';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { capitalize } from '@/utils/helpers';

export function Selected() {
  const [currentAction, setCurrentAction] = useState(0);
  const {
    data,
    selected,
    selectedOptions: { isOpen, actions, deleteOptions, onClose },
    onSelect,
  } = useTable();
  const { openModal } = useConfirmationModal();

  const close = () => {
    onClose();
    setCurrentAction(0);
    selected.forEach((id) => onSelect(id));
  };

  const finalActions = deleteOptions
    ? [
        ...actions,
        {
          text: 'Delete',
          onClick: () =>
            openModal({
              message: `Are you sure you want to delete ${selected.length} ${deleteOptions.resourceName.toLowerCase()}(s) ?`,
              title: `Delete ${capitalize(deleteOptions.resourceName)}s`,
              confirmText: 'Delete',
              onConfirm: () => {
                deleteOptions.onConfirm(selected);
                close();
              },
            }),
        },
      ]
    : actions;

  return (
    <Modal
      isOpen={isOpen}
      className={`fixed left-1/2 z-30 h-fit w-[95%] -translate-x-1/2 flex-row items-center justify-between rounded-lg border px-3 py-3 shadow-lg transition-[bottom] duration-300 mobile:w-[500px] mobile:px-5 ${isOpen ? 'bottom-11' : '-bottom-[100px]'}`}
      hideOverlay={true}
    >
      <h2 className='text-nowrap text-xs font-semibold text-text-secondary mobile:text-sm '>
        <span className='mr-2 rounded-md bg-secondary px-2 py-1 text-white'>{selected.length}</span>
        Row(s) Selected.
      </h2>
      <div className='flex items-center gap-3'>
        <Button color='tertiary' onClick={close}>
          Cancel
        </Button>
        <div className='relative overflow-hidden '>
          <Button className='invisible'>
            {finalActions.map((a) => a.text).toSorted((a, b) => b.length - a.length)[0]}
          </Button>
          {finalActions.map(({ text, color, onClick, disabledCondition, message, className }, i) => {
            const disabled = disabledCondition ? disabledCondition(selected, data) : false;
            return (
              <ToolTip
                key={text}
                hidden={!message || !disabled}
                content={<span className='text-xs text-text-secondary'>{message?.(selected)}</span>}
              >
                <div
                  className='absolute right-0 top-0 w-full transition-all duration-500'
                  style={{ transform: `translateY(${(currentAction - i) * 100}%)` }}
                >
                  <Button
                    className={`w-full ${className}`}
                    color={color || 'red'}
                    onClick={() => onClick(selected, close)}
                    disabled={disabled}
                  >
                    {text}
                  </Button>
                </div>
              </ToolTip>
            );
          })}
        </div>
        {finalActions.length > 1 && (
          <div className='flex flex-col gap-0.5'>
            <Button
              size='small'
              shape='icon'
              className='h-fit w-fit text-xs'
              disabled={currentAction === 0}
              onClick={() => currentAction > 0 && setCurrentAction((prev) => prev - 1)}
            >
              <FaChevronUp />
            </Button>
            <Button
              size='small'
              shape='icon'
              className='h-fit w-fit text-xs'
              disabled={currentAction === finalActions.length - 1}
              onClick={() => currentAction < finalActions.length - 1 && setCurrentAction((prev) => prev + 1)}
            >
              <FaChevronDown />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
