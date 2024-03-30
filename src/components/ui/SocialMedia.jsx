import {
  GrYoutube,
  GrInstagram,
  GrTwitter,
  GrLinkedin,
  GrFacebookOption,
} from "react-icons/gr";

export function SocialMedia() {
  return (
    <>
      <a
        href="https://www.facebook.com"
        className="icon-button hover:bg-[#1877f2]"
      >
        <GrFacebookOption className="text-text-primary  transition-colors duration-300 group-hover:text-white" />
      </a>
      <a
        href="https://www.youtube.com"
        className="icon-button hover:bg-[#ff0000]"
      >
        <GrYoutube className="text-text-primary  transition-colors duration-300 group-hover:text-white" />
      </a>
      <a href="https://twitter.com" className="icon-button hover:bg-[#1da1f2]">
        <GrTwitter className="text-text-primary  transition-colors duration-300 group-hover:text-white" />
      </a>
      <a
        href="https://www.instagram.com/"
        className="icon-button hover:bg-[#e1306c]"
      >
        <GrInstagram className="text-text-primary  transition-colors duration-300 group-hover:text-white" />
      </a>
      <a
        href="https://www.linkedin.com/"
        className="icon-button hover:bg-[#0a66c2]"
      >
        <GrLinkedin className="text-text-primary  transition-colors duration-300 group-hover:text-white" />
      </a>
    </>
  );
}
