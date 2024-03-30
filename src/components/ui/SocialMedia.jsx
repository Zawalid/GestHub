import {
  GrYoutube,
  GrInstagram,
  GrTwitter,
  GrLinkedin,
  GrFacebookOption,
} from "react-icons/gr";
import { Button } from "./Button";

const socials = [
  {
    href: "https://www.facebook.com",
    icon: <GrFacebookOption />,
    color: "#1877f2",
  },
  {
    href: "https://www.twitter.com",
    icon: <GrTwitter />,
    color: "#0a66c2",
  },
  {
    href: "https://www.instagram.com",
    icon: <GrInstagram />,
    color: "#e1306c",
  },
  {
    href: "https://www.linkedin.com",
    icon: <GrLinkedin />,
    color: "#1da1f2",
  },
  {
    href: "https://www.youtube.com",
    icon: <GrYoutube />,
    color: "#ff0000",
  },
];
export function SocialMedia() {
  return (
    <>
      {socials.map((s) => (
        <a href={s.href} key={s.href}>
          <Button
            shape="icon"
            type="transparent"
            className={`hover:bg-[${s.color}] text-text-primary group-hover:text-white`}
          >
            {s.icon}
          </Button>
        </a>
      ))}
    </>
  );
}
