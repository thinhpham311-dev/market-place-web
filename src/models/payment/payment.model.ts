import { PaymentStatus, PaymentMethod } from "@/types/payment";

export interface IPaymentModel {
  id: string;
  status: PaymentStatus;
  method: PaymentMethod;
  emailAddress: string;
}
