"use client";

import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { registrationSchema } from "./registerValidation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const { control } = form;

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="-space-y-2">
      <Form form={form} onSubmit={onSubmit}>
        <TextInput
          icon={User}
          name="name"
          label="Name"
          placeholder="Enter your Name"
        />
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
        <PasswordInput
          icon={Lock}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          passwordConfirm={confirmPassword}
          password={password}
        />
      </Form>
    </div>
  );
};

export default RegisterForm;
