import Link from "next/link";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />,   path: 'https://github.com/jancykoud' },
  { icon: <FaLinkedin />, path: 'https://linkedin.com/in/jancy-koud-banga' },
  { icon: <FaGitlab />,   path: 'https://gitlab.com/fridelinbanga' },
];

const RéseauxSociaux = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link key={index} href={item.path} className={iconStyles} target="_blank">
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default RéseauxSociaux;
