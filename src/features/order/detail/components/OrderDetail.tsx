"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { formatDateTime, formatToCurrency } from "@/utils/formats";
import { getOrderByIdForCurrentUser } from "@/features/order/utils/normalizeOrder";

export default function OrderDetail() {
  const { t } = useTranslation();
  const { id } = useParams() ?? {};
  const router = useRouter();
  const authUser = useAppSelector((state) => state.auth.user);
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);

  const { order } = useMemo(() => {
    const selectedOrder = getOrderByIdForCurrentUser(
      typeof id === "string" ? id : undefined,
      authUser,
      signedIn,
    );
    return { order: selectedOrder };
  }, [authUser, id, signedIn]);

  if (!order) {
    return <div>{t("order_not_found")}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="col-span-3 px-3 md:col-span-2 md:px-6">
        <CardHeader className="flex flex-row items-center gap-3">
          <Button onClick={() => router.back()} variant="outline" size="icon">
            <ArrowLeft />
          </Button>
          <CardTitle>{t("order_summary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>{t("order_order_id")}</strong> {order.id}
            </div>
            <div>
              <strong>{t("order_customer")}</strong> {order.customerName || t("order_guest")}
            </div>
            <div>
              <strong>{t("order_payment_method")}</strong> {order.paymentMethod}
            </div>
            <div>
              <strong>{t("order_status")}</strong>{" "}
              <Badge variant={order.isPaid ? "default" : "destructive"}>
                {order.isPaid ? t("order_paid") : t("order_unpaid")}
              </Badge>{" "}
              <Badge variant={order.isDelivered ? "default" : "secondary"}>
                {order.isDelivered ? t("order_delivered") : t("order_pending")}
              </Badge>
            </div>
            <div>
              <strong>{t("order_created_at")}</strong>{" "}
              {order.createdAt ? formatDateTime(order.createdAt) : "-"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 px-3 md:col-span-1 md:px-6">
        <CardHeader>
          <CardTitle>{t("order_shipping_address")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 px-3 md:col-span-2 md:px-6">
        <CardHeader>
          <CardTitle>{t("order_items")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("order_product")}</TableHead>
                <TableHead>{t("cart_column_quantity")}</TableHead>
                <TableHead>{t("order_price")}</TableHead>
                <TableHead>{t("cart_column_total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatToCurrency(item.price)}</TableCell>
                  <TableCell>{formatToCurrency(item.quantity * item.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="col-span-3 px-3 md:col-span-1 md:px-6">
        <CardHeader>
          <CardTitle>{t("order_price_summary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t("order_items_price")}</span>
              <span>{formatToCurrency(order.itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("order_shipping_price")}</span>
              <span>{formatToCurrency(order.shippingPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("order_tax_price")}</span>
              <span>{formatToCurrency(order.taxPrice)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>{t("order_total_price")}</span>
              <span>{formatToCurrency(order.totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
