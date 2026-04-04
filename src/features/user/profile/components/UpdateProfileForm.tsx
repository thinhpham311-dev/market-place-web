"use client";

import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormGroup, FormInput, FormSelect } from "@/components/shared";
import { useTranslation } from "@/lib/hooks";
import { isValidPhoneNumber } from "@/utils/validates";

const emailValidator = z.string().email();
const genderValues = ["male", "female"] as const;

const defaultValuesForUpdateProfileForm = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
};

export default function UpdateProfileForm() {
  const { t } = useTranslation();
  const FormSchema = z.object({
    fullname: z
      .string()
      .trim()
      .min(2, t("validation_enter_at_least_2_characters"))
      .max(250, t("validation_enter_no_more_than_250_characters")),
    username: z
      .string()
      .trim()
      .min(3, t("validation_enter_at_least_3_characters"))
      .max(25, t("validation_enter_no_more_than_25_characters"))
      .refine(
        (value) => /^[a-zA-Z0-9._-]+$/.test(value),
        t("validation_username_invalid_characters"),
      ),
    email: z
      .string()
      .trim()
      .min(1, t("validation_email_required"))
      .refine(
        (value) => (value ? emailValidator.safeParse(value).success : true),
        t("validation_invalid_email"),
      ),
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
    gender: z.enum(genderValues, {
      errorMap: () => ({ message: t("validation_choose_valid_gender") }),
    }),
    address: z
      .string()
      .trim()
      .min(5, t("validation_enter_at_least_5_characters"))
      .max(250, t("validation_enter_no_more_than_250_characters")),
  });

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
        label={t("form_full_name")}
        placeholder={t("update_profile_full_name_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="username"
        label={t("form_user_name")}
        placeholder={t("update_profile_user_name_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="phone"
        character="+84"
        label={t("form_phone_number")}
        placeholder={t("update_profile_phone_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormSelect
        className="col-span-2 md:col-span-1"
        name="gender"
        options={[
          { name: t("gender_male"), value: "male" },
          { name: t("gender_female"), value: "female" },
        ]}
        label={t("form_gender")}
        placeholder={t("update_profile_gender_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="email"
        label={t("form_email")}
        placeholder={t("update_profile_email_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <FormInput
        className="col-span-2 md:col-span-1"
        name="address"
        label={t("form_address")}
        placeholder={t("update_profile_address_placeholder")}
        formSchema={FormSchema}
        isRequired
      />
      <div className="col-span-2">
        <Button type="submit" className="float-right w-full md:w-auto" variant="outline">
          <span>
            <Save />
          </span>
          {t("form_save")}
        </Button>
      </div>
    </FormGroup>
  );
}
