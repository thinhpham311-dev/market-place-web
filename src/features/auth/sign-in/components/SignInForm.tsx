"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormCheckBox, FormGroup, FormInput } from "@/components/shared";
import { isValidPhoneNumber } from "@/utils/validates";
import { useSignIn } from "@/features/auth/sign-in/hooks/useSignIn";

const passwordSchema = z
  .string()
  .min(8, "Please enter at least 8 characters")
  .max(50, "Please enter no more than 50 characters")
  .refine((value) => !/\s/.test(value), "Password must not contain spaces");

const FormSchema = z.object({
  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .min(10, "Please enter at least 10 characters")
    .max(25, "Please enter no more than 25 characters")
    .refine((value) => {
      if (value) {
        return isValidPhoneNumber(value, "VN");
      }

      return true;
    }, "Invalid number"),
  password: passwordSchema,
  remember: z.boolean(),
});

const defaultValuesForSignInForm = {
  phone: "",
  password: "",
  remember: false,
};

export default function SignInForm() {
  const { signIn, isSubmitting } = useSignIn();

  return (
    <FormGroup
      defaultValues={defaultValuesForSignInForm}
      onHandleSubmit={(values) =>
        signIn({
          _id: "",
          phone: values.phone,
          password: values.password,
        })
      }
      className="space-y-5"
      formSchema={FormSchema}
    >
      <FormInput
        name="phone"
        label="Phone"
        placeholder="Please enter your phone number"
        formSchema={FormSchema}
        isRequired
        character="+84"
      />
      <FormInput
        inputType="password"
        name="password"
        label="Password"
        placeholder="Please enter your password"
        formSchema={FormSchema}
        isRequired
      />
      <FormCheckBox name="remember" label="Remember me" formSchema={FormSchema} />
      <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </FormGroup>
  );
}
