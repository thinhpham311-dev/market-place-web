"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput } from "@/components/shared";
import { useTranslation } from "@/lib/hooks";
import { useCheckOtp } from "@/features/auth/check-otp/hooks/useCheckOtp";

type CheckOtpFormProps = {
  email?: string;
};

export default function CheckOtpForm({ email = "" }: CheckOtpFormProps) {
  const { t } = useTranslation();
  const { verifyOtp, isSubmitting } = useCheckOtp();
  const FormSchema = z.object({
    email: z.string().trim().email(t("validation_valid_email")),
    otp: z
      .string()
      .trim()
      .min(4, t("validation_enter_at_least_4_characters"))
      .max(8, t("validation_enter_no_more_than_8_characters"))
      .regex(/^\d+$/, t("validation_otp_numbers_only")),
  });

  return (
    <FormGroup
      defaultValues={{
        email,
        otp: "",
      }}
      onHandleSubmit={(values) =>
        verifyOtp({
          email: values.email,
          otp: values.otp,
        })
      }
      className="space-y-5"
      formSchema={FormSchema}
    >
      <FormInput
        name="email"
        label={t("form_email")}
        placeholder={t("check_otp_email_placeholder")}
        formSchema={FormSchema}
        isRequired
      />

      <FormInput
        name="otp"
        label={t("form_otp_code")}
        placeholder={t("check_otp_code_placeholder")}
        formSchema={FormSchema}
        isRequired
      />

      <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
        {isSubmitting ? t("form_verifying") : t("form_verify_email")}
      </Button>
    </FormGroup>
  );
}
