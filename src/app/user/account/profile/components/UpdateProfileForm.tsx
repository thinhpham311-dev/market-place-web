"use client";
//ui
import { Button } from "@/components/ui/button";

//components
import { FormInput, FormGroup, FormSelect } from "@/components/shared";

//libs
import { z } from "zod";
import { isValidPhoneNumber } from "@/utils/validates";

//icons
import { Save } from "lucide-react";

const emailValidator = z.string().email();

const FormSchema = z.object({
  fullname: z
    .string()
    .nonempty("Fullname is required")
    .min(10, "Please enter at least 10 characters")
    .max(250, "Please enter no more than 250 characters"),
  username: z
    .string()
    .nonempty("Username is required")
    .min(10, "Please enter at least 10 characters")
    .max(25, "Please enter no more than 25 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .refine((v) => (v ? emailValidator.safeParse(v).success : true), "Invalid email"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .min(10, "Please enter at least 10 characters")
    .max(25, "Please enter no more than 25 characters")
    .refine((value) => {
      if (value) {
        return isValidPhoneNumber(value, "VN");
      }
      return true;
    }, "Invalid number"),
  gender: z.string().nonempty("Gender is required"),
  address: z
    .string()
    .nonempty("Address is required")
    .min(10, "Please enter at least 10 characters")
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
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };
  return (
    <FormGroup
      defaultValues={defaultValuesForUpdateProfileForm}
      onHandleSubmit={onSubmit}
      className="gap-5 grid grid-cols-2"
      formSchema={FormSchema}
    >
      <FormInput
        className="md:col-span-1 col-span-2"
        name="fullname"
        label="Full Name"
        placeholder="Please enter your fullname"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="md:col-span-1 col-span-2"
        name="username"
        label="User Name"
        placeholder="Please enter your username"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="md:col-span-1 col-span-2"
        name="phone"
        character="+84"
        label="Phone Number"
        placeholder="Please enter your phone number"
        formSchema={FormSchema}
        isRequired
      />
      <FormSelect
        className="md:col-span-1 col-span-2"
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
        className="md:col-span-1 col-span-2"
        name="email"
        label="Email"
        placeholder="Please enter your email"
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="md:col-span-1 col-span-2"
        name="address"
        label="Address"
        placeholder="Please enter your address"
        formSchema={FormSchema}
        isRequired
      />
      <div className="col-span-2">
        <Button type="submit" className="float-right md:w-[auto] w-full" variant="outline">
          <span>
            <Save />
          </span>
          Save
        </Button>
      </div>
    </FormGroup>
  );
}
