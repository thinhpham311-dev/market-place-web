"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormCheckBox, FormGroup, FormInput } from "@/components/shared";
import { useTranslation } from "@/lib/hooks";
import { isValidPhoneNumber } from "@/utils/validates";
import { useSignIn } from "@/features/auth/sign-in/hooks/useSignIn";

const defaultValuesForSignInForm = {
  phone: "",
  password: "",
  remember: false,
};

export default function SignInForm() {
  const { t } = useTranslation();
  const { signIn, isSubmitting } = useSignIn();
  const passwordSchema = z
    .string()
    .min(8, t("validation_enter_at_least_8_characters"))
    .max(50, t("validation_enter_no_more_than_50_characters"))
    .refine((value) => !/\s/.test(value), t("validation_password_no_spaces"));

  const FormSchema = z.object({
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
    remember: z.boolean(),
  });

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
        label={t("form_phone")}
        placeholder={t("sign_in_phone_placeholder")}
        formSchema={FormSchema}
        isRequired
        character="+84"
      />
      <FormInput
        inputType="password"
        name="password"
        label={t("form_password")}
        placeholder={t("sign_in_password_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormCheckBox name="remember" label={t("form_remember_me")} formSchema={FormSchema} />
      <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
        {isSubmitting ? t("form_signing_in") : t("sign_in")}
      </Button>
    </FormGroup>
  );
}
