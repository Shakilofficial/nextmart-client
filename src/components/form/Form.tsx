import { Button } from "@/components/ui/button";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormProps } from "./types";

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {children}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
