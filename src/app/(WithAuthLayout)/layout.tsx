import Logo from "@/components/shared/Logo";
import React from "react";
import authBg from "../../assets/photos/bg.jpeg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 relative">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${authBg?.src})`,
          opacity: 0.3,
          filter: "blur(6px)",
        }}
      />

      {/* Content Container */}
      <div className="relative w-full max-w-md rounded-lg p-8 flex flex-col space-y-2 items-center backdrop-blur-lg shadow-xl border border-rose-950/20 bg-rose-950/10 dark:border-rose-800/20">
        <Logo />
        {children}
      </div>
    </div>
  );
}
