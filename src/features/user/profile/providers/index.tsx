"use client";

import React from "react";
import { cn } from "@/utils/styles";

export type UserProfileFormValues = {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "";
  address: string;
};

export interface UserProfileData extends UserProfileFormValues {
  id: string;
}

interface UserProfileContextType {
  profile: UserProfileData | null;
  formDefaults: UserProfileFormValues;
  loading: boolean;
  error: string;
  status: "idle" | "loading" | "success" | "error";
}

interface UserProfileProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: UserProfileContextType;
}

export const EMPTY_USER_PROFILE_FORM_VALUES: UserProfileFormValues = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
};

export const UserProfileContext = React.createContext<UserProfileContextType | null>(null);

const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
  className,
  contextValues,
}) => {
  return (
    <UserProfileContext.Provider value={{ ...contextValues }}>
      <div className={cn(className)}>{children}</div>
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
