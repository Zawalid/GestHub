import { LEVELS, RULES } from '@/utils/constants';
import {
  useInterns,
  useAddIntern,
  useDeleteIntern,
  useUpdateIntern,
  useAcceptUsers,
  useAcceptedUsers,
} from './useInterns';
import { TableLayout } from '@/layouts/TableLayout';
import { Button, DropDown, Modal } from '@/components/ui';
import { FaPlus, LuUser } from '@/components/ui/Icons';
import { Table } from '@/components/shared/Table/';
import { AllInterns } from '../projects/NewProject/TeamMembers';
import { useState } from 'react';
import { AcademicLevel, Gender } from '@/pages/auth/Register';
import { getFilter,getIntervals } from '@/utils/helpers';

export default function InternsList() {
  const { interns, isLoading, error } = useInterns();
  const { mutate: addIntern } = useAddIntern();
  const { mutate: updateIntern } = useUpdateIntern();
  const { mutate: deleteIntern } = useDeleteIntern();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableLayout
        data={interns}
        isLoading={isLoading}
        error={error}
        resourceName='Intern'
        columns={[
          { key: 'id', displayLabel: 'ID', visible: true, type: 'number' },
          {
            key: 'firstName',
            displayLabel: 'First Name',
            visible: true,
            type: 'string',
          },
          {
            key: 'lastName',
            displayLabel: 'Last Name',
            visible: true,
            type: 'string',
          },
          {
            key: 'email',
            displayLabel: 'Email',
            visible: true,
            type: 'string',
          },
          {
            key: 'phone',
            displayLabel: 'Phone',
            visible: true,
            type: 'string',
          },
          {
            key: 'academicLevel',
            displayLabel: 'Academic Level',
            visible: true,
            type: 'string',
            filter: LEVELS.map((level) => ({ value: level, checked: false })),
          },
          {
            key: 'establishment',
            displayLabel: 'Establishment',
            visible: true,
            type: 'string',
            filter: getFilter(interns, 'establishment'),
          },
          {
            key: 'startDate',
            displayLabel: 'Start Date',
            visible: true,
            type: 'date',
            filter: getIntervals('startDate'),
          },
          {
            key: 'endDate',
            displayLabel: 'End Date',
            visible: true,
            type: 'date',
            filter: getIntervals('endDate'),
          },
        ]}
        formFields={[
          {
            name: 'firstName',
            label: 'First Name',
          },
          {
            name: 'lastName',
            label: 'Last Name',
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email Address',
          },
          {
            name: 'phone',
            label: 'Phone Number',
            type: 'phone',
          },
          {
            name: 'academicLevel',
            customComponent: <AcademicLevel />,
          },
          {
            name: 'gender',
            customComponent: <Gender />,
          },
          {
            name: 'establishment',
            label: 'Establishment',
            type: 'establishment',
          },
          {
            name: 'specialty',
            label: 'Specialty',
            type: 'text',
          },
          {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
          },
          {
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            rules: { ...RULES.endDate },
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
          },
          {
            name: 'password_confirmation',
            type: 'password',
            label: 'Confirm Password',
            rules: { ...RULES.passwordConfirmation },
          },
        ]}
        formDefaults={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: 'M',
          academicLevel: 'Bac+2',
          establishment: '',
          specialty: '',
          startDate: '',
          endDate: '',
          password: '',
          password_confirmation: '',
        }}
        fieldsToSearch={['firstName', 'lastName', 'email', 'academicLevel', 'establishment']}
        downloadOptions={{
          csvFileName: 'Interns',
          pdfFileName: 'Interns',
        }}
        onUpdate={updateIntern}
        onDelete={deleteIntern}
        layoutOptions={{
          displayNewRecord: (
            <DropDown
              toggler={
                <Button display='with-icon'>
                  <FaPlus />
                  New Intern
                </Button>
              }
              togglerDisabled={isLoading}
              options={{ className: 'w-32' }}
            >
              <Table.NewRecord
                onAdd={addIntern}
                component={(onAdd) => (
                  <DropDown.Option onClick={onAdd}>
                    <FaPlus />
                    New
                  </DropDown.Option>
                )}
              />

              <DropDown.Option onClick={() => setIsOpen(true)}>
                <LuUser />
                Select
              </DropDown.Option>
            </DropDown>
          ),
          displayTableRecord: true,
        }}
      />
      <SelectUsers isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function SelectUsers({ isOpen, onClose }) {
  const [interns, setInterns] = useState([]);
  const { acceptedUsers } = useAcceptedUsers();
  const { mutate } = useAcceptUsers();

  const close = () => (onClose(), setInterns([]));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={false}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Select Users for Internship</h1>
      <AllInterns teamMembers={interns} setTeamMembers={setInterns} selectedMembers={interns} users={acceptedUsers} />
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={close}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={interns.length === 0}
          onClick={() => {
            close();
            mutate({ ids: interns.map((g) => g.id) });
          }}
        >
          Add Interns
        </Button>
      </div>
    </Modal>
  );
}
