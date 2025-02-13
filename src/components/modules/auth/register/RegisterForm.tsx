"use client";

import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
          type="password"
        />
      </Form>
    </div>
  );
};

export default RegisterForm;
