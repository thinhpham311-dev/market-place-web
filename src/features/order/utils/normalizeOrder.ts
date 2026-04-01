import { orderData } from "@/constants/data";

export type OrderStatusKey = "all" | "inProgress" | "completed" | "cancel";

export type OrderViewItem = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
};

export type OrderViewModel = {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerId?: string;
  items: OrderViewItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt?: string;
  paidAt?: string;
  deliveredAt?: string;
  status: Exclude<OrderStatusKey, "all">;
};

type AuthUserLike = Record<string, unknown> | null | undefined;

function normalizeText(value?: string | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function buildUserDisplayName(user?: AuthUserLike) {
  if (!user || typeof user !== "object") {
    return "";
  }

  const firstName = typeof user.firstName === "string" ? user.firstName : "";
  const lastName = typeof user.lastName === "string" ? user.lastName : "";
  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName) {
    return fullName;
  }

  if (typeof user.userName === "string" && user.userName.trim()) {
    return user.userName.trim();
  }

  if (typeof user.name === "string" && user.name.trim()) {
    return user.name.trim();
  }

  if (typeof user.email === "string" && user.email.trim()) {
    return user.email.trim();
  }

  if (typeof user.phone === "string" && user.phone.trim()) {
    return user.phone.trim();
  }

  return "";
}

function matchesOrderToUser(order: OrderViewModel, user?: AuthUserLike) {
  if (!user || typeof user !== "object") {
    return false;
  }

  const userId = typeof user._id === "string" ? normalizeText(user._id) : "";
  const userEmail = typeof user.email === "string" ? normalizeText(user.email) : "";
  const userPhone = typeof user.phone === "string" ? normalizeText(user.phone) : "";
  const userName = normalizeText(buildUserDisplayName(user));

  return Boolean(
    (userId && normalizeText(order.customerId) === userId) ||
      (userEmail && normalizeText(order.customerEmail) === userEmail) ||
      (userPhone && normalizeText(order.customerPhone) === userPhone) ||
      (userName && normalizeText(order.customerName) === userName),
  );
}

export function normalizeOrders(): OrderViewModel[] {
  return (orderData ?? [])
    .map((order) => ({
      id: order._id,
      customerName: order.user?.name || "Guest",
      customerEmail: order.user?.email || "",
      customerPhone: order.user?.phone || "",
      customerId: order.user?._id || "",
      items: (order.items ?? []).map((item) => ({
        id: item._id,
        productName: item.product_name,
        price: item.product_price,
        quantity: item.qty,
        image: item.image,
      })),
      shippingAddress: {
        fullName: order.shippingAddress?.fullName || "",
        address: order.shippingAddress?.address || "",
        city: order.shippingAddress?.city || "",
        postalCode: order.shippingAddress?.postalCode || "",
        country: order.shippingAddress?.country || "",
      },
      paymentMethod: order.paymentMethod || "COD",
      paymentStatus: order.isPaid ? "paid" : "unpaid",
      deliveryStatus: order.isDelivered ? "delivered" : "pending",
      itemsPrice: order.itemsPrice || 0,
      shippingPrice: order.shippingPrice || 0,
      taxPrice: order.taxPrice || 0,
      totalPrice: order.totalPrice || 0,
      isPaid: Boolean(order.isPaid),
      isDelivered: Boolean(order.isDelivered),
      createdAt: order.createdAt,
      paidAt: order.paidAt,
      deliveredAt: order.deliveredAt,
      status: (order.status as Exclude<OrderStatusKey, "all">) || "inProgress",
    }))
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
}

export function getOrdersForCurrentUser(user?: AuthUserLike, signedIn: boolean = false) {
  if (!signedIn) {
    return [];
  }

  const orders = normalizeOrders();
  const matchedOrders = orders.filter((order) => matchesOrderToUser(order, user));

  if (matchedOrders.length > 0) {
    return matchedOrders;
  }

  const displayName = buildUserDisplayName(user);

  if (!displayName) {
    return orders;
  }

  return orders.map((order) => ({
    ...order,
    customerName: displayName,
    customerEmail:
      typeof user?.email === "string" && user.email.trim() ? user.email.trim() : order.customerEmail,
    customerPhone:
      typeof user?.phone === "string" && user.phone.trim() ? user.phone.trim() : order.customerPhone,
    customerId: typeof user?._id === "string" && user._id.trim() ? user._id.trim() : order.customerId,
    shippingAddress: {
      ...order.shippingAddress,
      fullName: displayName,
    },
  }));
}

export function getOrderByIdForCurrentUser(
  orderId?: string,
  user?: AuthUserLike,
  signedIn: boolean = false,
) {
  if (!orderId) return null;
  return getOrdersForCurrentUser(user, signedIn).find((order) => order.id === orderId) ?? null;
}
