import '@/styles/loading.css';

export function LoadingScreen() {
  return (
    <div className='relative w-full grid h-screen place-content-center place-items-center gap-4'>
      <div className='spinner'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
