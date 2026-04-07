"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import { apiGetUserProfile } from "@/features/user/profile/services";
import {
  EMPTY_USER_PROFILE_FORM_VALUES,
  type UserProfileData,
  type UserProfileFormValues,
} from "@/features/user/profile/providers";

type ProfileApiPayload = Record<string, unknown> | null | undefined;

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeGender(value: unknown): UserProfileFormValues["gender"] {
  const normalized = normalizeString(value).toLowerCase();
  return normalized === "male" || normalized === "female" ? normalized : "";
}

function resolveUserId(user: unknown): string {
  if (!user || typeof user !== "object") {
    return "";
  }

  const userRecord = user as Record<string, unknown>;

  const candidateKeys = ["_id", "usr_id", "user_id", "id"] as const;

  for (const key of candidateKeys) {
    const value = userRecord[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function resolveProfilePayload(payload: ProfileApiPayload): ProfileApiPayload {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return (
    (payload.metadata as ProfileApiPayload) ??
    (payload.data as ProfileApiPayload) ??
    payload
  );
}

function buildFormDefaults(source: ProfileApiPayload): UserProfileFormValues {
  if (!source || typeof source !== "object") {
    return EMPTY_USER_PROFILE_FORM_VALUES;
  }

  const firstName = normalizeString(source.firstName);
  const lastName = normalizeString(source.lastName);
  const fullnameCandidate = normalizeString(source.fullname || source.fullName);
  const fullname = fullnameCandidate || `${firstName} ${lastName}`.trim();

  return {
    fullname,
    username: normalizeString(source.username || source.userName),
    email: normalizeString(source.email),
    phone: normalizeString(source.phone),
    gender: normalizeGender(source.gender),
    address: normalizeString(source.address),
  };
}

export function useFetchData() {
  const authUser = useAppSelector((state) => state.auth.user);
  const userId = useMemo(() => resolveUserId(authUser), [authUser]);
  const authUserDefaults = useMemo(() => buildFormDefaults(authUser), [authUser]);

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    let isMounted = true;

    if (!userId) {
      setProfile(null);
      setLoading(false);
      setError("");
      setStatus("idle");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        setStatus("loading");

        const response = await apiGetUserProfile({ usr_id: userId });
        const payload = resolveProfilePayload(response.data as ProfileApiPayload);
        const formDefaults = buildFormDefaults(payload);

        if (!isMounted) {
          return;
        }

        setProfile({
          id: userId,
          ...formDefaults,
        });
        setStatus("success");
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setProfile(null);
        setError(getApiErrorMessage(fetchError));
        setStatus("error");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const formDefaults = profile
    ? buildFormDefaults(profile as unknown as Record<string, unknown>)
    : authUserDefaults;

  return {
    profile,
    formDefaults,
    loading,
    error,
    status,
  };
}
