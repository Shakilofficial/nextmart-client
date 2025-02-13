"use client";

import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="-space-y-2">
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
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
      </Form>
    </div>
  );
};

export default LoginForm;
