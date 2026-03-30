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

const customerLinks = [
  { label: "Help Center", href: "/help-center" },
  { label: "How to Order", href: "/guide/order" },
  { label: "Payment Methods", href: "/guide/payment" },
  { label: "Shipping & Delivery", href: "/guide/shipping" },
  { label: "Return Policy", href: "/guide/returns" },
];

const policyLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Dispute Resolution", href: "/legal/dispute" },
  { label: "Inspection Policy", href: "/legal/inspection" },
  { label: "Frequently Asked Questions", href: "/faq" },
];

const sellerLinks = [
  { label: "Seller Center", href: "/seller" },
  { label: "Start Selling", href: "/seller/register" },
  { label: "Listing Guidelines", href: "/seller/policy" },
  { label: "Service Fees & Commission", href: "/seller/pricing" },
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
  return (
    <footer className="mt-12 border-t bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto grid gap-3 px-6 py-4 md:grid-cols-2 xl:grid-cols-4">
          <FooterBadge icon={Truck} label="Nationwide Delivery" />
          <FooterBadge icon={ShieldCheck} label="Secure Payments" />
          <FooterBadge icon={PackageCheck} label="Easy Returns" />
          <FooterBadge icon={Headset} label="24/7 Customer Support" />
        </div>
      </div>

      <div className="container mx-auto grid gap-8 px-6 py-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <div>
            <p className="text-xl font-semibold">Market Place</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              A multi-category shopping platform with authentic products, fast delivery, and clear
              post-purchase support for both buyers and sellers.
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
              <span>Support available daily from 08:00 to 22:00</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Customer Care
          </h3>
          <ul className="space-y-3">
            {customerLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Policies</h3>
          <ul className="space-y-3">
            {policyLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">For Sellers</h3>
          <ul className="space-y-3">
            {sellerLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Payments</h3>
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Shipping</h3>
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
            © {new Date().getFullYear()} Market Place. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-foreground" />
              <span>Trusted eCommerce Marketplace</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-foreground" />
              <span>Protected Transactions</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Store className="h-4 w-4 text-foreground" />
              <span>Support for Sellers and Businesses</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
