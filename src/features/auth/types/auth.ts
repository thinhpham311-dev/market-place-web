export type SignInResponse = {
  message?: string;
  hasSession?: boolean;
  token?: string;
  user?: unknown;
};

export type SignUpResponse = {
  message?: string;
  hasSession?: boolean;
  token?: string;
  user?: unknown;
};

export type VerifyEmailOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyEmailOtpResponse = {
  message?: string;
  hasSession?: boolean;
  token?: string;
  user?: unknown;
};
