export function Stat({ isLoading, value, label, icon, onClick, className }) {
  return (
    <div
      className={`flex min-h-24 items-start justify-between rounded-lg p-3 shadow-md ${className}
      ${onClick ? 'cursor-pointer transition-transform duration-300 hover:scale-95' : ''}
      `}
      onClick={() => onClick?.()}
    >
      <div className='space-y-3'>
        <h4 className={`text-sm font-medium ${label.color || 'text-white/80'}`}>{label.value}</h4>
        {isLoading ? (
          <div className='sending'></div>
        ) : (
          <h3 className={`text-3xl font-bold ${value.color || 'text-white'}`}>{value.value}</h3>
        )}
      </div>
      <div className={`rounded-lg p-2 text-xl ${icon.className || 'bg-white/30 text-white'}`}>{icon.icon}</div>
    </div>
  );
}

