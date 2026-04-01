"use client";

import { useState } from "react";
import { ShieldCheck, Trash2, BellOff, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "@/lib/hooks";

type PrivacyPreferenceKey =
  | "showProfile"
  | "personalizedRecommendations"
  | "orderUpdates"
  | "marketingOffers"
  | "rememberTrustedDevices";

const defaultPreferences: Record<PrivacyPreferenceKey, boolean> = {
  showProfile: true,
  personalizedRecommendations: true,
  orderUpdates: true,
  marketingOffers: false,
  rememberTrustedDevices: true,
};

const preferenceGroups = [
  {
    titleKey: "privacy_section_visibility",
    descriptionKey: "privacy_section_visibility_desc",
    icon: ShieldCheck,
    items: [
      {
        key: "showProfile",
        titleKey: "privacy_pref_profile_visibility",
        descriptionKey: "privacy_pref_profile_visibility_desc",
      },
    ],
  },
  {
    titleKey: "privacy_section_recommendations",
    descriptionKey: "privacy_section_recommendations_desc",
    icon: BellOff,
    items: [
      {
        key: "personalizedRecommendations",
        titleKey: "privacy_pref_personalized_recommendations",
        descriptionKey: "privacy_pref_personalized_recommendations_desc",
      },
    ],
  },
  {
    titleKey: "privacy_section_notifications",
    descriptionKey: "privacy_section_notifications_desc",
    icon: BellOff,
    items: [
      {
        key: "orderUpdates",
        titleKey: "privacy_pref_order_updates",
        descriptionKey: "privacy_pref_order_updates_desc",
      },
      {
        key: "marketingOffers",
        titleKey: "privacy_pref_marketing_offers",
        descriptionKey: "privacy_pref_marketing_offers_desc",
      },
    ],
  },
  {
    titleKey: "privacy_section_security",
    descriptionKey: "privacy_section_security_desc",
    icon: LockKeyhole,
    items: [
      {
        key: "rememberTrustedDevices",
        titleKey: "privacy_pref_trusted_devices",
        descriptionKey: "privacy_pref_trusted_devices_desc",
      },
    ],
  },
] as const;

export default function PrivacySettingsCard() {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState(defaultPreferences);

  const handleCheckedChange = (key: PrivacyPreferenceKey, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <Card className="border-none bg-gradient-to-r from-stone-50 via-white to-orange-50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <ShieldCheck className="h-6 w-6 text-orange-600" />
            {t("sidebar_privacy_settings")}
          </CardTitle>
          <CardDescription>{t("privacy_settings_desc")}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{t("privacy_preferences_title")}</CardTitle>
            <CardDescription>{t("privacy_preferences_desc")}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPreferences(defaultPreferences);
                toast.success(t("privacy_reset_success"));
              }}
            >
              {t("privacy_reset")}
            </Button>
            <Button
              type="button"
              onClick={() => {
                toast.success(t("privacy_save_success"));
              }}
            >
              {t("privacy_save_changes")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {preferenceGroups.map((group, groupIndex) => {
            const Icon = group.icon;

            return (
              <div key={group.titleKey} className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t(group.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(group.descriptionKey)}</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-stone-200 p-4">
                  {group.items.map((item, itemIndex) => (
                    <div key={item.key}>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.key}
                          checked={preferences[item.key]}
                          onCheckedChange={(checked) => handleCheckedChange(item.key, checked === true)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label htmlFor={item.key} className="font-medium">
                            {t(item.titleKey)}
                          </label>
                          <p className="text-sm text-muted-foreground">{t(item.descriptionKey)}</p>
                        </div>
                      </div>

                      {itemIndex < group.items.length - 1 ? <Separator className="my-3" /> : null}
                    </div>
                  ))}
                </div>

                {groupIndex < preferenceGroups.length - 1 ? <Separator /> : null}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-red-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-red-600">{t("privacy_danger_zone_title")}</CardTitle>
          <CardDescription>{t("privacy_danger_zone_desc")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium">{t("privacy_request_delete_title")}</p>
            <p className="text-sm text-muted-foreground">{t("privacy_request_delete_desc")}</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="border-red-300 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                {t("privacy_request_delete_button")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("privacy_delete_dialog_title")}</AlertDialogTitle>
                <AlertDialogDescription>{t("privacy_delete_dialog_desc")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("privacy_cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => toast.success(t("privacy_delete_request_success"))}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {t("privacy_confirm_delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
