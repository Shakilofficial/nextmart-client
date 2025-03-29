import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { changePassword } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { changePasswordSchema } from "./ChangePassowrdValidation";

const ChangePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const {
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await changePassword(data);
      if (res?.success) {
        toast.success(res?.message);
        reset();
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
        recaptchaStatus={true}
      >
        <PasswordInput
          icon={Lock}
          name="oldPassword"
          label="Old Password"
          placeholder="Enter your old password"
        />
        <PasswordInput
          icon={Lock}
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
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

export default ChangePasswordForm;
