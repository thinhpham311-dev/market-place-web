"use client";

import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput } from "@/components/shared";

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
    password: z
      .string()
      .min(8, "Please enter at least 8 characters")
      .max(50, "Please enter no more than 50 characters")
      .refine((value) => !/\s/.test(value), "Password must not contain spaces"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "New password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New password must match",
  })
  .refine((data) => data.password !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password",
  });

const defaultValuesForChangePasswordForm = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordForm() {
  return (
    <FormGroup
      defaultValues={defaultValuesForChangePasswordForm}
      onHandleSubmit={(values) => {
        console.log(values);
      }}
      className="space-y-5"
      formSchema={FormSchema}
    >
      <FormInput
        inputType="password"
        name="password"
        label="Password"
        placeholder="Please enter password"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        inputType="password"
        name="newPassword"
        label="New Password"
        placeholder="Please enter new password"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        inputType="password"
        name="confirmNewPassword"
        label="Confirm New Password"
        placeholder="Please enter new password confirm"
        formSchema={FormSchema}
        isRequired
      />
      <div className="col-span-2">
        <Button type="submit" variant="outline" className="w-full">
          <span>
            <Save />
          </span>
          Save
        </Button>
      </div>
    </FormGroup>
  );
}
