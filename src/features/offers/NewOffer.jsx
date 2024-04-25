import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, CheckBox, DropDown, InputField, Modal } from '@/components/ui';
import { useForm } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useAddOffer, useOffers } from './useOffers';
import { PiCheckBold, HiMiniXMark } from '@/components/ui/Icons';

export default function NewOffer() {
  const navigate = useNavigate();
  const { mutate } = useAddOffer();

  return (
    <Modal
      isOpen={location.pathname === '/app/offers/new'}
      className='p-5 md:h-[515px] md:w-4/5 md:border lg:w-3/5'
      closeOnBlur={false}
    >
      <h1 className='mb-5 text-2xl font-bold text-text-primary'>New Offer</h1>
      <OfferForm
        defaultValues={{
          title: '',
          description: '',
          duration: 3,
          city: 'Rabat',
          direction: 'DSI',
          sector: 'IT',
          type: 'Hybrid',
          experience: 'Beginner',
          status: 'Normal',
          skills: [],
        }}
        onSubmit={(data) =>
          mutate({
            ...data,
            visibility: 'Visible',
            publicationDate: new Date().toISOString().split('T')[0],
          })
        }
        onClose={() => navigate('/app/offers')}
        type='add'
      />
    </Modal>
  );
}

export function OfferForm({ defaultValues, onSubmit, onClose, type }) {
  const {
    options: { isUpdated, isValid, formInputs, getValue, setValue, handleSubmit, reset },
  } = useForm({
    defaultValues,
    fields: [
      {
        name: 'title',
        label: 'Title',
        placeholder: 'Enter title...',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description...',
        rows: '5',
      },
      {
        name: 'duration',
        label: 'Duration (in months)',
        placeholder: 'Enter duration...',
        type: 'number',
        max: 24,
        rules: {
          max: { value: 24, message: 'Max duration is 2 years' },
          min: { value: 1, message: 'Max duration is 2 years' },
        },
      },
      {
        name: 'city',
        label: 'City',
        type: 'city',
        placeholder: 'Enter city...',
      },
      {
        name: 'direction',
        label: 'Direction',
        placeholder: 'Enter direction',
      },
      {
        name: 'sector',
        hidden: true,
      },
      {
        name: 'type',
        hidden: true,
      },
      {
        name: 'experience',
        hidden: true,
      },
      {
        name: 'skills',
        hidden: true,
      },
      {
        name: 'status',
        hidden: true,
      },
    ],
    onSubmit: (data) => onSubmit({ ...data, skills: data.skills.length ? data.skills.join(',') : null }),
  });

  return (
    <ModalFormLayout
      submitButton={{
        text: type === 'add' ? 'Add Offer' : 'Update Offer',
        disabled: type === 'add' ? !isValid : !isValid || !isUpdated,
        onClick: () => handleSubmit(onClose, true),
      }}
      cancelButton={{ onClick: () => reset(onClose) }}
    >
      <div className='flex flex-col gap-5 mobile:flex-row'>
        <div className='flex flex-col gap-5 mobile:flex-1'>
          {formInputs['title']}
          {formInputs['description']}
          <Sector getValue={getValue} setValue={setValue} />
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-text-tertiary'>Type</label>
            <DropDown
              toggler={
                <DropDown.Toggler>
                  <span>{getValue('type')}</span>
                </DropDown.Toggler>
              }
            >
              {['Onsite', 'Hybrid', 'Remote'].map((e) => (
                <DropDown.Option key={e} onClick={() => setValue('type', e)} isCurrent={e === getValue('type')}>
                  {e}
                </DropDown.Option>
              ))}
            </DropDown>
          </div>
        </div>
        <div className='flex flex-col gap-5 mobile:flex-1'>
          {formInputs['city']}
          {formInputs['direction']}
          {formInputs['duration']}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-text-tertiary'>Experience</label>
            <DropDown
              toggler={
                <DropDown.Toggler>
                  <span>{getValue('experience')}</span>
                </DropDown.Toggler>
              }
            >
              {['Expert', 'Intermediate', 'Beginner'].map((e) => (
                <DropDown.Option
                  key={e}
                  onClick={() => setValue('experience', e)}
                  isCurrent={e === getValue('experience')}
                >
                  {e}
                </DropDown.Option>
              ))}
            </DropDown>
          </div>

          <Skills getValue={getValue} setValue={setValue} />
        </div>
      </div>
      <div className='mt-5 flex items-center gap-3'>
        <CheckBox
          checked={getValue('status') === 'Urgent'}
          onChange={(e) => setValue('status', e.target.checked ? 'Urgent' : 'Normal')}
        />
        <label className='text-sm font-medium text-text-tertiary'>Mark this offer as urgent</label>
      </div>
    </ModalFormLayout>
  );
}

function Sector({ getValue, setValue }) {
  const [newSector, setNewSector] = useState('');
  const { offers } = useOffers();

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-text-tertiary'>Sector</label>
      <DropDown
        toggler={
          <DropDown.Toggler>
            <span>{getValue('sector')}</span>
          </DropDown.Toggler>
        }
        options={{ className: 'overflow-auto max-h-[300px] w-[230px]', shouldCloseOnClick: false }}
      >
        <DropDown.Title>New Sector</DropDown.Title>
        <div className='mb-2 flex items-center gap-1'>
          <InputField placeholder='Enter sector...' value={newSector} onChange={(e) => setNewSector(e.target.value)} />
          <Button
            shape='icon'
            className='h-full w-7 rounded-md border border-border'
            disabled={!newSector}
            onClick={() => {
              setValue('sector', newSector);
              setNewSector('');
            }}
          >
            <PiCheckBold />
          </Button>
        </div>
        <DropDown.Title>Previous Sectors</DropDown.Title>
        {[...new Set(offers?.map((offer) => offer.sector))].map((e) => (
          <DropDown.Option key={e} onClick={() => setValue('sector', e)} isCurrent={e === getValue('sector')}>
            {e}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
}

function Skills({ getValue, setValue }) {
  const [currentSkill, setCurrentSkill] = useState('');
  const [parent] = useAutoAnimate({ duration: 300 });

  const skills = getValue('skills');

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-text-tertiary'>Skills</label>
      <div className='flex flex-wrap gap-3 rounded-lg border border-border bg-background-secondary p-2' ref={parent}>
        {skills?.map((skill) => (
          <div
            key={skill}
            className='relative rounded-md border border-border bg-background-tertiary px-2 py-1 text-center text-xs font-medium text-text-secondary'
          >
            <button
              className='absolute -right-1 -top-1.5 h-3 w-3 rounded-full bg-red-500 text-white'
              onClick={() =>
                setValue(
                  'skills',
                  skills?.filter((s) => s !== skill)
                )
              }
            >
              <HiMiniXMark />
            </button>
            <span>{skill}</span>
          </div>
        ))}
        <input
          type='text'
          placeholder='Add skill...'
          className='w-28 rounded-md border border-border bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary outline-none'
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !skills?.includes(e.target.value)) {
              setValue('skills', [...skills, e.target.value]);
              setCurrentSkill('');
            }
          }}
        />
      </div>
    </div>
  );
}
