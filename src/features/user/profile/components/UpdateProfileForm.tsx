"use client";

import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput, FormSelect } from "@/components/shared";
import { isValidPhoneNumber } from "@/utils/validates";

const emailValidator = z.string().email();
const genderValues = ["male", "female"] as const;

const FormSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters")
    .max(250, "Please enter no more than 250 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Please enter at least 3 characters")
    .max(25, "Please enter no more than 25 characters")
    .refine((value) => /^[a-zA-Z0-9._-]+$/.test(value), "Username contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .refine((value) => (value ? emailValidator.safeParse(value).success : true), "Invalid email"),
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
  gender: z.enum(genderValues, {
    errorMap: () => ({ message: "Please choose a valid gender" }),
  }),
  address: z
    .string()
    .trim()
    .min(5, "Please enter at least 5 characters")
    .max(250, "Please enter no more than 250 characters"),
});

const defaultValuesForUpdateProfileForm = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
};

export default function UpdateProfileForm() {
  return (
    <FormGroup
      defaultValues={defaultValuesForUpdateProfileForm}
      onHandleSubmit={(values) => {
        console.log(values);
      }}
      className="grid grid-cols-2 gap-5"
      formSchema={FormSchema}
    >
      <FormInput
        className="col-span-2 md:col-span-1"
        name="fullname"
        label="Full Name"
        placeholder="Please enter your fullname"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="username"
        label="User Name"
        placeholder="Please enter your username"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="phone"
        character="+84"
        label="Phone Number"
        placeholder="Please enter your phone number"
        formSchema={FormSchema}
        isRequired
      />
      <FormSelect
        className="col-span-2 md:col-span-1"
        name="gender"
        options={[
          { name: "male", value: "male" },
          { name: "female", value: "female" },
        ]}
        label="Choose gender"
        placeholder="Please your choose gender"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="email"
        label="Email"
        placeholder="Please enter your email"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="address"
        label="Address"
        placeholder="Please enter your address"
        formSchema={FormSchema}
        isRequired
      />
      <div className="col-span-2">
        <Button type="submit" className="float-right w-full md:w-auto" variant="outline">
          <span>
            <Save />
          </span>
          Save
        </Button>
      </div>
    </FormGroup>
  );
}
