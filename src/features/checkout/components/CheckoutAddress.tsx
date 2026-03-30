"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CheckoutAddressValues, CheckoutFieldErrors } from "@/features/checkout/types/checkout";
import { cn } from "@/utils/styles";

interface CheckoutAddressProps {
  values: CheckoutAddressValues;
  errors: CheckoutFieldErrors;
  onChange: (field: keyof CheckoutAddressValues, value: string) => void;
}

export default function CheckoutAddress({ values, errors, onChange }: CheckoutAddressProps) {
  const fields: Array<{
    name: keyof CheckoutAddressValues;
    label: string;
    placeholder: string;
    className?: string;
  }> = [
    { name: "fullName", label: "Full Name", placeholder: "Enter the recipient name" },
    { name: "email", label: "Email", placeholder: "Enter your email address" },
    { name: "phone", label: "Phone", placeholder: "Enter your phone number" },
    { name: "city", label: "City", placeholder: "Enter your city" },
    { name: "postalCode", label: "Postal Code", placeholder: "Enter postal code" },
    { name: "country", label: "Country", placeholder: "Enter your country" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <p className="text-sm text-muted-foreground">
          Confirm where we should deliver your order and how we can reach you.
        </p>
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
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={values.address}
            placeholder="Street address, ward, district"
            onChange={(event) => onChange("address", event.target.value)}
            className={cn(errors.address && "border-red-500 focus-visible:ring-red-500")}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="note">Order Note</Label>
          <Textarea
            id="note"
            value={values.note}
            placeholder="Leave a note for the seller or courier"
            onChange={(event) => onChange("note", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
