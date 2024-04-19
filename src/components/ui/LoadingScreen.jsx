import '@/styles/loading.css';

export function LoadingScreen() {
  return (
    <div className='relative grid h-screen place-content-center place-items-center gap-4'>
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
      {/* <h2 className='text-text-secondary font-medium text-lg'>Loading...</h2> */}
    </div>
  );
}
