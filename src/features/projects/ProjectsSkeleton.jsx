export default function ProjectsSkeleton({layout}) {
  return (
    <div  className={`gap-5 animate-pulse w-full ${
        layout === "grid"
          ? "grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))]"
          : "flex flex-col"
      }`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Project key={i} />
      ))}
    </div>
  );
}

function Project() {
  return (
    <div className="h-[200px] grid-rows-[24px_auto_20px_28px] gap-5 grid bg-background-disabled p-3 px-5 border border-border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="bg-background-secondary w-20 h-4 rounded-md"></div>
        <div className="bg-background-secondary w-6 h-6 rounded-md"></div>
      </div>
      <div className="space-y-3">
        <div className="w-full h-2 rounded-md bg-background-secondary"></div>
        <div className="w-full h-1 rounded-md bg-background-tertiary"></div>
        <div className="w-1/2 h-1 rounded-md bg-background-tertiary"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-1 rounded-sm bg-background-secondary"></div>
        <div className="py-1 w-full rounded-lg bg-background-tertiary relative"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1 relative h-7">
          <div className="absolute top-0 left-0 z-[1] h-7 w-7 rounded-full border border-border bg-background-secondary"></div>
          <div className="absolute top-0  left-[15px] z-[1] h-7 w-7 rounded-full border border-border bg-background-secondary"></div>
          <div className="absolute top-0  left-[30px] z-[1] h-7 w-7 rounded-full border border-border bg-background-secondary"></div>
        </div>
        <div className="bg-background-secondary w-20 h-4 rounded-md"></div>
      </div>
    </div>
  );
}
