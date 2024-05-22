import { LEVELS, RULES } from '@/utils/constants';
import {
  useInterns,
  useAddIntern,
  useDeleteIntern,
  useUpdateIntern,
  useAcceptUsers,
  useAcceptedUsers,
  useDeleteInterns,
} from './useInterns';
import { TableLayout } from '@/layouts/TableLayout';
import { Button, DropDown, Modal } from '@/components/ui';
import { FaPlus, LuUser } from '@/components/ui/Icons';
import { Table, useTable } from '@/components/shared/Table/';
import { AllInterns } from '../projects/NewProject/TeamMembers';
import { useState } from 'react';
import { AcademicLevel, Gender } from '@/pages/auth/Register';
import { getFilter, getIntervals } from '@/utils/helpers';
import { useUser } from '@/hooks/useUser';
import { renderProjects } from '../supervisors/SupervisorsList';

export default function InternsList() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { interns, isLoading, error } = useInterns();
  const { mutate: updateIntern } = useUpdateIntern();
  const { mutate: deleteIntern } = useDeleteIntern();
  const { mutate: deleteInterns } = useDeleteInterns();

  return (
    <>
      <TableLayout
        data={interns}
        isLoading={isLoading}
        error={error}
        resourceName='Intern'
        columns={[
          {
            key: 'id',
            displayLabel: 'ID',
            visible: true,
            type: 'number',
          },
          {
            key: 'fullName',
            displayLabel: 'Full Name',
            visible: true,
            type: 'string',
            format: (val, id) => `${interns?.find((i) => i.id === id)?.gender || 'M'}. ${val}`,
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
          {
            key: 'status',
            displayLabel: 'Status',
            visible: true,
            type: 'string',
            format: (val, id, isDownload) => {
              const colors = {
                Completed: 'bg-green-600',
                Upcoming: 'bg-yellow-600',
                'Starting Tomorrow': 'bg-yellow-600',
                'Starting Today': 'bg-blue-600',
                Ongoing: 'bg-orange-600',
              };
              return isDownload ? (
                val
              ) : (
                <span className={`rounded-lg px-2.5 py-1 text-white ${colors[val]}`}>{val}</span>
              );
            },
            filter: [
              { value: 'Completed', checked: false },
              { value: 'Upcoming', checked: false },
              { value: 'Starting Today', checked: false },
              { value: 'Ongoing', checked: false },
            ],
          },
          { ...renderProjects },
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
          displayNewRecord: user?.role !== 'supervisor' ? <NewIntern setIsOpen={setIsOpen} /> : null,
          displayTableRecord: true,
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: 'intern',
            onConfirm: (ids, setIsOperating) => deleteInterns(ids, { onSettled: () => setIsOperating(false) }),
          },
        }}
        hideAllRowsActions={user?.role === 'supervisor'}
      />
      {user?.role !== 'supervisor' && <SelectUsers isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}

function NewIntern({ setIsOpen }) {
  const { disabled } = useTable();
  const { mutate: addIntern } = useAddIntern();

  return (
    <DropDown
      toggler={
        <Button display='with-icon'>
          <FaPlus />
          New Intern
        </Button>
      }
      togglerDisabled={disabled}
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
      <AllInterns
        teamMembers={interns}
        setTeamMembers={setInterns}
        selectedMembers={interns}
        users={acceptedUsers || []}
      />
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button color='tertiary' onClick={close}>
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={interns.length === 0}
          onClick={() => {
            close();
            mutate(interns.map((g) => g.id));
          }}
        >
          Add Interns
        </Button>
      </div>
    </Modal>
  );
}
