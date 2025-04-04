import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your account on NEXA — your online store for fashion, electronics, home essentials, and more.",
};

const LoginPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>
      <div className="bg-transparent">
        <LoginForm />
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Don &apos;t have an account?
          <Link href="/register" className="text-primary pl-1 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
