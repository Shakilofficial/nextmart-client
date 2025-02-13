import React from "react";
import authBg from "../assets/photos/bg.jpeg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image with Opacity and Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${authBg?.src})`,
          opacity: 0.3,
          filter: "blur(8px)",
        }}
      />

      {/* Content Container */}
      <div className="relative backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
