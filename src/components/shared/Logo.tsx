import Image from "next/image";
import Link from "next/link";
import logoImg from "../../app/assets/svgs/Logo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src={logoImg}
        alt="NEXA Logo"
        width={60}
        height={30}
        className="w-[60px] md:w-[100px] h-[30px] md:h-[50px]"
      />
    </Link>
  );
};

export default Logo;
