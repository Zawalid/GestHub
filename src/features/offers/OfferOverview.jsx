import { useParams } from 'react-router-dom';
import { Button, DropDown, Modal, Status, ToolTip } from '@/components/ui';
import { useDeleteOffer, useOffer, useUpdateOffer } from './useOffers';
import {
  FaStar,
  IoEllipsisHorizontalSharp,
  IoEyeOffOutline,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  PiX,
} from '@/components/ui/Icons';
import { formatDate } from '@/utils/helpers';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { OfferForm } from './NewOffer';
import { useState } from 'react';
import { OfferSkeleton } from './OffersSkeleton';
import { FaRegStar } from 'react-icons/fa';
import { useUser } from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';
import { useIsMutating } from '@tanstack/react-query';

export default function OfferOverview({ onHomePage, isFavorite, onToggleFavorite, onApply }) {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { user } = useUser();
  const { offer, isLoading, error } = useOffer(id);
  const { mutate } = useUpdateOffer();
  const navigate = useNavigateWithQuery();
  const { t } = useTranslation();
  const { title, description, duration, city, publicationDate, company, sector, type, experience, status, skills } =
    offer || {};

  const isAlreadyApplied = user?.applications?.find((d) => d.offer_id === +id);

  const close = () => navigate(onHomePage ? '/' : '/app/offers');

  const render = () => {
    if (isLoading) return <OfferSkeleton />;
    if (error) {
      return (
        <Status
          status='error'
          heading={error.message === 'Not found' && "Sorry, we couldn't find the offer you're looking for."}
          message={error.message === 'Not found' ? 'Please check the offer ID and try again.' : error.message}
        />
      );
    }
    return (
      <div>
        {onHomePage || (
          <div
            className={`absolute left-0 top-0 flex h-full w-full  flex-col p-5 transition-transform duration-500 ${isEditing ? '' : '-translate-y-full'}`}
          >
            <OfferForm
              defaultValues={offer}
              onSubmit={(data) => isEditing && mutate({ id, data })}
              onClose={() => setIsEditing(false)}
              type='edit'
            />
          </div>
        )}
        <div
          className={`absolute left-0 top-0 mb-5 flex h-[calc(100%-50px)] w-full flex-col p-5 pt-10 transition-transform duration-500 ${isEditing ? '-z-10 translate-y-[calc(100%+50px)]' : ''}`}
        >
          <div className='mb-3 flex items-center gap-2'>
            {status === 'Urgent' && (
              <ToolTip content={<span className='text-xs text-text-secondary'>This offer is urgent</span>}>
                <span className='h-3 w-3 rounded-full bg-red-500'></span>
              </ToolTip>
            )}
            <h2 className='text-2xl font-bold'>
              {title || 'Untitled'}
              <span className='ml-2 text-xs font-medium text-secondary'>({sector})</span>
            </h2>
          </div>
          <div className='overflow-auto'>
            <p className='text-xs text-text-secondary sm:text-sm'>{description || 'No description'}</p>
            <div className='mt-5 space-y-2   border-t border-border pt-2'>
              <h3 className='text-lg font-medium text-text-primary'>Offer Details</h3>
              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>Company :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {company}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>City :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {city}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>Publication Date :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {formatDate(publicationDate)}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>Duration :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {duration < 12
                      ? `${duration} months`
                      : duration === 12
                        ? '1 year'
                        : `1 year and ${duration - 12} months`}{' '}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>Experience :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {experience}
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <label className='text-sm font-medium text-text-tertiary'>Type :</label>
                  <span className='w-fit rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                    {type}
                  </span>
                </div>
              </div>
              <div className='flex gap-3'>
                <label className='text-nowrap text-sm font-medium text-text-tertiary'>Skills :</label>
                <div className='flex flex-wrap items-center gap-3'>
                  {skills?.length > 0 ? (
                    skills?.map((skill) => (
                      <span
                        key={skill}
                        className='rounded-md border border-border px-2 py-1 text-center text-xs font-medium text-text-secondary'
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className='w-fit rounded-md border border-border px-2 py-1 text-center text-xs font-medium text-text-secondary'>
                      No skills required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={id && id !== 'new'} className='p-5 sm:h-fit sm:min-h-[400px] sm:w-[650px] sm:border' onClose={close}>
      <div className='z-10 flex justify-end gap-2'>
        {!isEditing && !onHomePage && (
          <>
            <Actions offer={offer} disabled={isLoading || error} onEdit={() => setIsEditing(true)} />
            <Button className='right-2 top-2 z-10' shape='icon' size='small' onClick={() => navigate('/app/offers')}>
              <PiX />
            </Button>
          </>
        )}
        {onHomePage && (user?.role === 'user' || !user) && !isLoading && !error && (
          <Button shape='icon' onClick={() => onToggleFavorite(id)}>
            {isFavorite?.(id) ? <FaStar className='text-yellow-500' /> : <FaRegStar className='  text-text-primary' />}
          </Button>
        )}
      </div>

      {render()}
      {onHomePage && (user?.role === 'user' || !user) && (
        <div className='z-10 mt-auto flex justify-end gap-3'>
          <Button color='tertiary' onClick={close}>
            {t('actions.close')}
          </Button>
          <Button
            disabled={isLoading || error || isAlreadyApplied}
            onClick={() => (user ? onApply() : navigate('/login', { state: { source: `/${id}` } }))}
          >
            {isAlreadyApplied ? t('offers.alreadyApplied') : t('offers.apply')}
          </Button>
        </div>
      )}
    </Modal>
  );
}

function Actions({ offer, disabled, onEdit }) {
  const { openModal } = useConfirmationModal();
  const { mutate: deleteOffer } = useDeleteOffer();
  const { mutate: updateOffer } = useUpdateOffer();
  const navigate = useNavigateWithQuery();
  const isOperating = useIsMutating({ mutationKey: ['offers'] });


  return (
    <div className='self-end'>
      <DropDown
        toggler={
          <Button shape='icon' size='small'>
            <IoEllipsisHorizontalSharp />
          </Button>
        }
        options={{ className: 'w-[200px]' }}
        togglerDisabled={disabled || isOperating}
      >
        <DropDown.Option onClick={onEdit}>
          <MdDriveFileRenameOutline />
          Edit Offer
        </DropDown.Option>
        <DropDown.Option
          onClick={() =>
            updateOffer({
              id: offer?.id,
              data: { visibility: offer?.visibility === 'Hidden' ? 'Visible' : 'Hidden' },
            })
          }
        >
          {offer?.visibility === 'Hidden' ? (
            <>
              <IoEyeOutline />
              Show Offer
            </>
          ) : (
            <>
              <IoEyeOffOutline />
              Hide Offer
            </>
          )}
        </DropDown.Option>
        <DropDown.Option
          onClick={() =>
            openModal({
              message: 'Are you sure you want to delete this offer ?',
              title: 'Delete Offer',
              confirmText: 'Delete',
              onConfirm: () => deleteOffer(offer?.id, { onSuccess: () => navigate('/app/offers') }),
            })
          }
        >
          <IoTrashOutline />
          Delete Offer
        </DropDown.Option>
      </DropDown>
    </div>
  );
}
