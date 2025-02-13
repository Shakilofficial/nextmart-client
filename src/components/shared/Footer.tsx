import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-4 md:px-6 lg:px-8 w-full">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center mb-6 px-4">
          <Logo className="w-[120px] h-auto" />
          <p className="text-gray-600 mt-3 max-w-md md:max-w-lg">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
        </div>

        <hr className="border-gray-300" />
        <ul className="flex flex-wrap justify-center space-x-4 text-sm text-gray-800 font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.href} className="mb-2 md:mb-0">
              <Link href={link.href} className="hover:text-rose-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-4">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-rose-600"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
