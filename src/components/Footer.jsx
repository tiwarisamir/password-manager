import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#272932] flex flex-col items-center justify-center p-2 mt-16  w-full bottom-0">
      <div className="text-2xl font-bold text-white">
        <span className="text-cyan-400">Pass</span>Man*
      </div>
      <p className="text-white text-md">Created by Samir Tiwari</p>
      <div className="flex gap-3 invert text-lg m-2">
        <a href="https://github.com/tiwarisamir" target="_blank">
          <FaGithub />
        </a>
        <a href="https://twitter.com/samir11_tiwari" target="_blank">
          <FaXTwitter />
        </a>
        <a href="https://www.linkedin.com/in/samirtiwari2061/" target="_blank">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
