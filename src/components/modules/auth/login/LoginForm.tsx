/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { loginUser, reCaptchaTokenVarification } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

const LoginForm = () => {
  const { setIsLoading } = useUser();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting, isValid },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVarification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message);
      }
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Demo Login functionality
  const handleDemoLogin = (userType: "user" | "shopOwner" | "admin") => {
    let demoCredentials = {
      email: "",
      password: "",
    };

    // Set demo credentials based on user type
    if (userType === "user") {
      demoCredentials = { email: "rakib@example.com", password: "12345678" };
    } else if (userType === "shopOwner") {
      demoCredentials = { email: "shakib75@gmail.com", password: "12345678" };
    } else if (userType === "admin") {
      demoCredentials = {
        email: "mrshakilhossain@outlook.com",
        password: "admin123",
      };
    }

    // Set the form values to the demo credentials and submit
    form.setValue("email", demoCredentials.email);
    form.setValue("password", demoCredentials.password);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="-space-y-2 flex justify-center items-center">
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus={reCaptchaStatus}
      >
        <TextInput
          icon={Mail}
          name="email"
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <PasswordInput
          icon={Lock}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
          onChange={handleReCaptcha}
        />

        <div className="mt-4 flex flex-col gap-2">
          <Button size="sm" onClick={() => handleDemoLogin("user")}>
            Demo User Login
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDemoLogin("shopOwner")}
          >
            Demo Shop Owner Login
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleDemoLogin("admin")}
          >
            Demo Admin Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
