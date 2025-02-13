import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Register
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your account to start your journey with us.
        </p>
      </div>
      <div className="bg-transparent">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
