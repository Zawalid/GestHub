import InternsList from "../components/shared/InternsList";

export function Interns() {
  return <div className="flex h-full flex-col overflow-x-hidden pr-1 sm:pr-3 overflow-y-auto gap-5">
    <h1 className="text-3xl font-bold text-text-primary">Interns</h1>
    <InternsList />
  </div>
}
