import Image from "next/image";
import Link from "next/link";
import logoImg from "../../app/assets/svgs/Logo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="w-[100px] h-auto">
        <Image
          src={logoImg}
          alt="NEXA Logo"
          width={100}
          height={36}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </Link>
  );
};

export default Logo;
