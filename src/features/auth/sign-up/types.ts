import type { IUser } from "@/interfaces/user";

export interface SignUpContextType {
  signUp: (values: IUser) => Promise<void>;
  isSubmitting: boolean;
}
