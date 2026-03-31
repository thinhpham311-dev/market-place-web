"use client";

import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput } from "@/components/shared";
import { useTranslation } from "@/lib/hooks";

const defaultValuesForChangePasswordForm = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordForm() {
  const { t } = useTranslation();
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
      password: z
        .string()
        .min(8, t("validation_enter_at_least_8_characters"))
        .max(50, t("validation_enter_no_more_than_50_characters"))
        .refine((value) => !/\s/.test(value), t("validation_password_no_spaces")),
      newPassword: passwordSchema,
      confirmNewPassword: z.string().min(1, t("validation_new_password_confirmation_required")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: t("validation_new_password_must_match"),
    })
    .refine((data) => data.password !== data.newPassword, {
      path: ["newPassword"],
      message: t("validation_new_password_different"),
    });

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
        label={t("form_password")}
        placeholder={t("change_password_current_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        inputType="password"
        name="newPassword"
        label={t("form_new_password")}
        placeholder={t("change_password_new_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        inputType="password"
        name="confirmNewPassword"
        label={t("form_confirm_new_password")}
        placeholder={t("change_password_confirm_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <div className="col-span-2">
        <Button type="submit" variant="outline" className="w-full">
          <span>
            <Save />
          </span>
          {t("form_save")}
        </Button>
      </div>
    </FormGroup>
  );
}
