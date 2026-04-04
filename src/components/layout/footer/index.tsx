"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  Headset,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { useTranslation } from "@/lib/hooks";

const customerLinks = [
  { labelKey: "footer_help_center", href: "/help-center" },
  { labelKey: "footer_how_to_order", href: "/guide/order" },
  { labelKey: "footer_payment_methods", href: "/guide/payment" },
  { labelKey: "footer_shipping_delivery", href: "/guide/shipping" },
  { labelKey: "footer_return_policy", href: "/guide/returns" },
];

const policyLinks = [
  { labelKey: "footer_terms_of_service", href: "/legal/terms" },
  { labelKey: "footer_privacy_policy", href: "/legal/privacy" },
  { labelKey: "footer_dispute_resolution", href: "/legal/dispute" },
  { labelKey: "footer_inspection_policy", href: "/legal/inspection" },
  { labelKey: "footer_faq", href: "/faq" },
];

const sellerLinks = [
  { labelKey: "footer_seller_center", href: "/seller" },
  { labelKey: "footer_start_selling", href: "/seller/register" },
  { labelKey: "footer_listing_guidelines", href: "/seller/policy" },
  { labelKey: "footer_service_fees", href: "/seller/pricing" },
];

const paymentMethods = ["Visa", "Mastercard", "JCB", "Momo", "ZaloPay", "COD"];
const shippingPartners = ["GHN", "GHTK", "Viettel Post", "J&T Express"];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
      </Link>
    </li>
  );
}

function FooterBadge({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 text-foreground" />
      <span>{label}</span>
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const resolvedCustomerLinks = customerLinks.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
  }));
  const resolvedPolicyLinks = policyLinks.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
  }));
  const resolvedSellerLinks = sellerLinks.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
  }));

  return (
    <footer className="mt-12 border-t bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto grid gap-3 px-6 py-4 md:grid-cols-2 xl:grid-cols-4">
          <FooterBadge icon={Truck} label={t("footer_badge_nationwide_delivery")} />
          <FooterBadge icon={ShieldCheck} label={t("footer_badge_secure_payments")} />
          <FooterBadge icon={PackageCheck} label={t("footer_badge_easy_returns")} />
          <FooterBadge icon={Headset} label={t("footer_badge_customer_support")} />
        </div>
      </div>

      <div className="container mx-auto grid gap-8 px-6 py-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <div>
            <p className="text-xl font-semibold">{t("footer_brand_name")}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {t("footer_brand_desc")}
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
              <span>123 Nguyen Hue Street, Ben Nghe Ward, District 1, Ho Chi Minh City</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-foreground" />
              <a href="tel:19001234" className="hover:text-foreground">
                1900 1234
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-foreground" />
              <a href="mailto:support@marketplace.vn" className="hover:text-foreground">
                support@marketplace.vn
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 shrink-0 text-foreground" />
              <span>{t("footer_support_hours")}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            {t("footer_customer_care")}
          </h3>
          <ul className="space-y-3">
            {resolvedCustomerLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            {t("footer_policies")}
          </h3>
          <ul className="space-y-3">
            {resolvedPolicyLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            {t("footer_for_sellers")}
          </h3>
          <ul className="space-y-3">
            {resolvedSellerLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              {t("footer_payments")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="rounded-md border bg-background px-3 py-2 text-xs font-medium"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              {t("footer_shipping")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {shippingPartners.map((partner) => (
                <div
                  key={partner}
                  className="rounded-md border bg-background px-3 py-2 text-xs font-medium"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="container mx-auto flex flex-col gap-4 px-6 py-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t("footer_brand_name")}. {t("footer_all_rights_reserved")}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-foreground" />
              <span>{t("footer_trusted_marketplace")}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-foreground" />
              <span>{t("footer_protected_transactions")}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Store className="h-4 w-4 text-foreground" />
              <span>{t("footer_support_businesses")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
