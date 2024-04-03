import SupervisorsList from "../components/admin/SupervisorsList";

export function Supervisors() {
  return (
<div className="flex h-full flex-col overflow-x-hidden pr-1 sm:pr-3 overflow-y-auto gap-5">      <h1 className="text-3xl font-bold text-text-primary">Supervisors</h1>
      <SupervisorsList />
    </div>
  );
}
