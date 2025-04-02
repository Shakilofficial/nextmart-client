import Image from "next/image";
import Link from "next/link";
import logoImg from "../../assets/svgs/Logo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src={logoImg || "/placeholder.svg"}
        alt="NEXA Logo"
        width={60}
        height={30}
        className="w-[60px] md:w-[80px] h-[30px] md:h-[40px] object-contain"
      />
    </Link>
  );
};

export default Logo;
