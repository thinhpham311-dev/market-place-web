"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput } from "@/components/shared";
import { isValidPhoneNumber } from "@/utils/validates";
import { useSignUp } from "@/features/auth/sign-up/hooks/useSignUp";

const passwordSchema = z
  .string()
  .min(8, "Please enter at least 8 characters")
  .max(50, "Please enter no more than 50 characters")
  .refine((value) => !/\s/.test(value), "Password must not contain spaces")
  .refine((value) => /[A-Z]/.test(value), "Password must include at least 1 uppercase letter")
  .refine((value) => /[a-z]/.test(value), "Password must include at least 1 lowercase letter")
  .refine((value) => /\d/.test(value), "Password must include at least 1 number");

const FormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "Please enter at least 2 characters")
      .max(50, "Maximum 50 characters")
      .refine((value) => /^[a-zA-Z\s'-]+$/.test(value), "First name contains invalid characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Please enter at least 2 characters")
      .max(50, "Maximum 50 characters")
      .refine((value) => /^[a-zA-Z\s'-]+$/.test(value), "Last name contains invalid characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .or(z.literal("")),
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
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((values) => values.password !== values.phone, {
    path: ["password"],
    message: "Password must not be the same as your phone number",
  });

const defaultValuesForSignUpForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const { signUp, isSubmitting } = useSignUp();

  return (
    <FormGroup
      defaultValues={defaultValuesForSignUpForm}
      onHandleSubmit={(values) =>
        signUp({
          _id: "",
          ...values,
          email: values.email || undefined,
        })
      }
      className="space-y-5"
      formSchema={FormSchema}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          formSchema={FormSchema}
          isRequired
        />
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          formSchema={FormSchema}
          isRequired
        />
      </div>

      <FormInput
        name="email"
        label="Email"
        placeholder="Enter your email address"
        formSchema={FormSchema}
      />

      <FormInput
        name="phone"
        character="+84"
        label="Phone Number"
        placeholder="Enter your phone number"
        formSchema={FormSchema}
        isRequired
      />

      <FormInput
        inputType="password"
        name="password"
        label="Password"
        placeholder="Create a password"
        formSchema={FormSchema}
        isRequired
      />

      <FormInput
        inputType="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        formSchema={FormSchema}
        isRequired
      />

      <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </FormGroup>
  );
}
