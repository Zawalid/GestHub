import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';

export function SocialMedia() {
  return (
    <>
      <a
        href='https://www.facebook.com'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#1877f2]'
      >
        <GrFacebookOption className='text-text-primary  transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.youtube.com'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#ff0000]'
      >
        <GrYoutube className='text-text-primary  transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://twitter.com'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#1da1f2]'
      >
        <GrTwitter className='text-text-primary  transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.instagram.com/'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#e1306c]'
      >
        <GrInstagram className='text-text-primary  transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.linkedin.com/'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#0a66c2]'
      >
        <GrLinkedin className='text-text-primary  transition-colors duration-300 group-hover:text-white' />
      </a>
    </>
  );
}