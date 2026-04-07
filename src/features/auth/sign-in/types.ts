import type { IUser } from "@/interfaces/user";

export interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignInContextType {
  signIn: (values: IUser) => Promise<void>;
  isSubmitting: boolean;
}
