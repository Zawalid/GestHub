import { CheckBox, Switch } from '@/components/ui';
import { useForm } from '@/hooks';
import { ModalFormLayout } from '@/layouts';
import { useSettings, useUpdateSettings } from './useSettings';
import { useRoutes } from '@/hooks/useRoutes';

export default function SideBar() {
  const { settings } = useSettings(true);
  const { mutate } = useUpdateSettings(true);
  const { sidebar } = useRoutes();
  const {
    options: { isUpdated, handleSubmit, reset, getValue, setValue },
  } = useForm({
    defaultValues: { showInSideBar: settings.showInSideBar || [], showCount: settings.showCount || false },
    fields: [],
    onSubmit: (data) => mutate({ ...settings, ...data }),
  });

  const showInSideBar = getValue('showInSideBar');

  return (
    <ModalFormLayout
      submitButton={{ onClick: handleSubmit, disabled: !isUpdated }}
      cancelButton={{ onClick: reset, disabled: !isUpdated }}
    >
      <div className='space-y-5'>
        <div>
          <div>
            <h4 className='font-bold text-text-secondary'>Show in sidebar</h4>
            <p className='mt-2 text-xs text-text-tertiary'>Choose what to show in the sidebar.</p>
          </div>
          <div className={`mt-5 grid gap-3 ${sidebar.length > 6 ? 'grid-cols-2' : ''}`}>
            {sidebar.map(({ name, icon }) => (
              <div key={name} className='flex items-center gap-3 text-text-secondary'>
                <CheckBox
                  checked={showInSideBar.includes(name)}
                  onChange={() => {
                    const arr = showInSideBar.includes(name)
                      ? showInSideBar.filter((t) => t !== name)
                      : [...showInSideBar, name];
                    setValue('showInSideBar', arr.toSorted());
                  }}
                />
                <div className='grid grid-cols-[25px_auto] items-center'>
                  {icon}
                  <span className='capitalize'>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-bold text-text-secondary'>Show count</h4>
            <p className='mt-2 text-xs text-text-tertiary'>Show the number of tasks in each list.</p>
          </div>
          <Switch checked={getValue('showCount')} onChange={(e) => setValue('showCount', e.target.checked)} />
        </div>
        <div>
          <span className='text-sm font-medium text-text-tertiary'>Example</span>
          <ul className='mt-2 w-[250px] space-y-1 rounded-lg bg-background-secondary p-3'>
            {['projects', 'sessions'].map((tab) => (
              <li key={tab} className={`sidebar-element text-sm group ${tab === 'projects' ? 'active' : ''}`}>
                {sidebar.find((r) => r.name === tab).icon}
                <span className='capitalize'>{tab}</span>
                <div className={`count text-xs ${getValue('showCount') ? 'scale-100' : 'scale-0'}`}>
                  <span className='text-xs font-semibold text-text-secondary'>{tab === 'projects' ? 5 : 3}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalFormLayout>
  );
}
