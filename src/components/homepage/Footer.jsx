import { SocialMedia } from "../ui/SocialMedia";
import Shade from "../ui/shade";

export function Footer() {
  return (
    <footer className="relative flex mt-auto items-center justify-center gap-6  shadow-md  bg-background-secondary px-5 ">
      <SocialMedia />
      <Shade
        className=" absolute rotate-180 bottom-full left-0 w-full overflow-hidden leading-[0] "
        svg="h-14 md:h-16 w-full"
      />
    </footer>
  );
}

// function Link({ children }) {
//   return (
//     <li className='relative h-8 w-fit overflow-hidden text-text-tertiary transition-colors duration-300 before:absolute  before:bottom-0 before:left-0 before:h-[1px] before:w-full  before:-translate-x-full before:bg-white before:transition-transform before:duration-500 hover:text-text-tertiary hover:text-white hover:before:translate-x-0'>
//       {children}
//     </li>
//   );
// }
