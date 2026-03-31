"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useTranslation } from "@/lib/hooks";
import { CheckoutAddressValues, CheckoutFieldErrors } from "@/features/checkout/types/checkout";
import { cn } from "@/utils/styles";

interface CheckoutAddressProps {
  values: CheckoutAddressValues;
  errors: CheckoutFieldErrors;
  onChange: (field: keyof CheckoutAddressValues, value: string) => void;
}

export default function CheckoutAddress({ values, errors, onChange }: CheckoutAddressProps) {
  const { t } = useTranslation();

  const fields: Array<{
    name: keyof CheckoutAddressValues;
    label: string;
    placeholder: string;
    className?: string;
  }> = [
    {
      name: "fullName",
      label: t("checkout_full_name"),
      placeholder: t("checkout_recipient_name_placeholder"),
    },
    { name: "email", label: t("checkout_email"), placeholder: t("checkout_email_placeholder") },
    { name: "phone", label: t("checkout_phone"), placeholder: t("checkout_phone_placeholder") },
    { name: "city", label: t("checkout_city"), placeholder: t("checkout_city_placeholder") },
    {
      name: "postalCode",
      label: t("checkout_postal_code"),
      placeholder: t("checkout_postal_code_placeholder"),
    },
    {
      name: "country",
      label: t("checkout_country"),
      placeholder: t("checkout_country_placeholder"),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("checkout_shipping_details")}</h2>
        <p className="text-sm text-muted-foreground">{t("checkout_shipping_details_desc")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn("space-y-2", field.className)}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={(event) => onChange(field.name, event.target.value)}
              className={cn(errors[field.name] && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors[field.name] && <p className="text-sm text-red-500">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">{t("checkout_address")}</Label>
          <Input
            id="address"
            value={values.address}
            placeholder={t("checkout_address_placeholder")}
            onChange={(event) => onChange("address", event.target.value)}
            className={cn(errors.address && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="note">{t("checkout_order_note")}</Label>
          <Textarea
            id="note"
            value={values.note}
            placeholder={t("checkout_order_note_placeholder")}
            onChange={(event) => onChange("note", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
