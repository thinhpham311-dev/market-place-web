"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput } from "@/components/shared";
import { useTranslation } from "@/lib/hooks";
import { isValidPhoneNumber } from "@/utils/validates";
import { useSignUp } from "@/features/auth/sign-up/hooks/useSignUp";

const defaultValuesForSignUpForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const { t } = useTranslation();
  const { signUp, isSubmitting } = useSignUp();
  const passwordSchema = z
    .string()
    .min(8, t("validation_enter_at_least_8_characters"))
    .max(50, t("validation_enter_no_more_than_50_characters"))
    .refine((value) => !/\s/.test(value), t("validation_password_no_spaces"))
    .refine((value) => /[A-Z]/.test(value), t("validation_password_uppercase"))
    .refine((value) => /[a-z]/.test(value), t("validation_password_lowercase"))
    .refine((value) => /\d/.test(value), t("validation_password_number"));

  const FormSchema = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, t("validation_enter_at_least_2_characters"))
        .max(50, t("validation_enter_no_more_than_50_characters"))
        .refine(
          (value) => /^[a-zA-Z\s'-]+$/.test(value),
          t("validation_first_name_invalid_characters"),
        ),
      lastName: z
        .string()
        .trim()
        .min(2, t("validation_enter_at_least_2_characters"))
        .max(50, t("validation_enter_no_more_than_50_characters"))
        .refine(
          (value) => /^[a-zA-Z\s'-]+$/.test(value),
          t("validation_last_name_invalid_characters"),
        ),
      email: z.string().trim().email(t("validation_valid_email")).or(z.literal("")),
      phone: z
        .string()
        .trim()
        .nonempty(t("validation_phone_required"))
        .min(10, t("validation_enter_at_least_10_characters"))
        .max(25, t("validation_enter_no_more_than_25_characters"))
        .refine((value) => {
          if (value) {
            return isValidPhoneNumber(value, "VN");
          }

          return true;
        }, t("validation_invalid_number")),
      password: passwordSchema,
      confirmPassword: z.string().min(1, t("validation_confirm_password_required")),
    })
    .refine((values) => values.password === values.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation_passwords_do_not_match"),
    })
    .refine((values) => values.password !== values.phone, {
      path: ["password"],
      message: t("validation_password_not_same_as_phone"),
    });

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
          label={t("form_first_name")}
          placeholder={t("sign_up_first_name_placeholder")}
          formSchema={FormSchema}
          isRequired
        />
        <FormInput
          name="lastName"
          label={t("form_last_name")}
          placeholder={t("sign_up_last_name_placeholder")}
          formSchema={FormSchema}
          isRequired
        />
      </div>

      <FormInput
        name="email"
        label={t("form_email")}
        placeholder={t("sign_up_email_placeholder")}
        formSchema={FormSchema}
      />

      <FormInput
        name="phone"
        character="+84"
        label={t("form_phone_number")}
        placeholder={t("sign_up_phone_placeholder")}
        formSchema={FormSchema}
        isRequired
      />

      <FormInput
        inputType="password"
        name="password"
        label={t("form_password")}
        placeholder={t("sign_up_password_placeholder")}
        formSchema={FormSchema}
        isRequired
      />

      <FormInput
        inputType="password"
        name="confirmPassword"
        label={t("form_confirm_password")}
        placeholder={t("sign_up_confirm_password_placeholder")}
        formSchema={FormSchema}
        isRequired
      />

      <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
        {isSubmitting ? t("form_creating_account") : t("form_create_account")}
      </Button>
    </FormGroup>
  );
}
