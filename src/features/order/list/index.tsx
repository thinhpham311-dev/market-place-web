"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock3, CreditCard, PackageCheck, ReceiptText, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { formatDateTime, formatToCurrency } from "@/utils/formats";
import {
  getOrdersForCurrentUser,
  type OrderStatusKey,
  type OrderViewModel,
} from "@/features/order/utils/normalizeOrder";

const filterKeys: OrderStatusKey[] = ["all", "inProgress", "completed", "cancel"];

function OrderStatusBadge({ order }: { order: OrderViewModel }) {
  const { t } = useTranslation();

  if (order.status === "completed") {
    return (
      <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
        {t("order_completed")}
      </Badge>
    );
  }

  if (order.status === "cancel") {
    return <Badge variant="destructive">{t("order_cancelled")}</Badge>;
  }

  return <Badge variant="secondary">{t("order_in_progress")}</Badge>;
}

export default function OrderPurchasePage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<OrderStatusKey>("all");
  const authUser = useAppSelector((state) => state.auth.user);
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);

  const orders = useMemo(() => getOrdersForCurrentUser(authUser, signedIn), [authUser, signedIn]);
  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") {
      return orders;
    }

    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter, orders]);

  const summary = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const completedCount = orders.filter((order) => order.status === "completed").length;
    const processingCount = orders.filter((order) => order.status === "inProgress").length;

    return {
      totalOrders: orders.length,
      totalSpent,
      completedCount,
      processingCount,
    };
  }, [orders]);

  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-4 border-none bg-gradient-to-r from-orange-50 via-white to-amber-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
              {t("header_my_purchase")}
            </CardTitle>
            <CardDescription>{t("order_purchase_desc")}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("order_total_orders")}</p>
              <p className="text-xl font-semibold">{summary.totalOrders}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("order_processing")}</p>
              <p className="text-xl font-semibold">{summary.processingCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <PackageCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("order_completed")}</p>
              <p className="text-xl font-semibold">{summary.completedCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("order_total_spent")}</p>
              <p className="text-xl font-semibold">{formatToCurrency(summary.totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>{t("order_history_title")}</CardTitle>
              <CardDescription>{t("order_history_desc")}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterKeys.map((filterKey) => (
                <Button
                  key={filterKey}
                  type="button"
                  size="sm"
                  variant={activeFilter === filterKey ? "default" : "outline"}
                  onClick={() => setActiveFilter(filterKey)}
                >
                  {t(
                    filterKey === "all"
                      ? "order_filter_all"
                      : filterKey === "inProgress"
                        ? "order_in_progress"
                        : filterKey === "completed"
                          ? "order_completed"
                          : "order_cancelled",
                  )}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
              {t("order_empty")}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden border-stone-200 shadow-none">
                <CardContent className="space-y-4 p-4 md:p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <OrderStatusBadge order={order} />
                        <span className="text-sm text-muted-foreground">
                          {t("order_order_id")}: {order.id}
                        </span>
                      </div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("order_created_at")}:{" "}
                        {order.createdAt ? formatDateTime(order.createdAt) : "-"}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted-foreground">{t("order_total_price")}</p>
                      <p className="text-xl font-semibold">{formatToCurrency(order.totalPrice)}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-xl bg-stone-50 px-3 py-3"
                      >
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("checkout_qty")}: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatToCurrency(item.price)}
                          </p>
                          <p className="font-semibold">
                            {formatToCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href={`/user/purchase/orders/${order.id}`}>
                        {t("order_view_detail")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
