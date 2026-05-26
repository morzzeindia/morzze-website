import OrderDetails, {
  type OrderDetailViewModel,
} from "@/components/order/OrderDetails"
import { getOrderById } from "@/helper/order/action"
import { getProfile } from "@/helper/user/action"

function formatINR(amount: number | null | undefined) {
  if (amount == null) return "—"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatStatus(status: string | null | undefined) {
  if (!status) return "—"
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

function formatPaymentMethod(method: string | null | undefined): string {
  if (!method) return "—"
  const m = method.toLowerCase()
  if (m === "razorpay") return "Paid online (Razorpay)"
  if (m === "cod") return "Cash on Delivery (COD)"
  return method
}

function formatShippingAddress(order: {
  addressLine1: string | null
  addressLine2: string | null
  city: string | null
  state: string | null
  pincode: string | null
}): string {
  const parts = [
    order.addressLine1,
    order.addressLine2,
    order.city,
    order.state,
    order.pincode,
  ].filter((p): p is string => Boolean(p && String(p).trim()))
  return parts.join(", ") || "—"
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderSlug: string }>
}) {
  const { orderSlug } = await params
  const dbOrder = await getOrderById(orderSlug)

  if (!dbOrder) {
    return <div className="text-white">Order not found</div>
  }

  const profile = await getProfile()
  if (dbOrder.userId !== profile.userId) {
    return <div className="text-white">Order not found</div>
  }

  const items = dbOrder.items ?? []
  const linesSubtotal = items.reduce(
    (s, i) => s + (i.productPrice ?? 0) * (i.quantity ?? 0),
    0,
  )
  
  // Use database values if available, fallback to calculated values
  const subtotalAmount = dbOrder.subtotalAmount ?? linesSubtotal
  const discountAmount = dbOrder.discountAmount ?? 0
  const couponCode = dbOrder.couponCode ?? null
  const total = dbOrder.totalAmount ?? 0
  
  // Calculate GST as 18% of the ORIGINAL subtotal (before discount)
  const gstAmount = Math.round(subtotalAmount * 0.18)
  const discountedSubtotal = subtotalAmount - discountAmount
  
  // For display
  const subtotalFormatted = formatINR(subtotalAmount)
  const discountFormatted = discountAmount > 0 ? formatINR(discountAmount) : null
  const gstFormatted = formatINR(gstAmount)
  const taxFormatted = formatINR(gstAmount)

  const lineItems = items.map((i, idx) => ({
    id: i.id ?? `${dbOrder.id}-line-${idx}`,
    name: (i.productName ?? "Item").trim() || "Item",
    variant: i.productVarientBox?.trim() || "—",
    quantity: i.quantity ?? 0,
    unitPriceFormatted: formatINR(i.productPrice ?? 0),
    lineTotalFormatted: formatINR((i.productPrice ?? 0) * (i.quantity ?? 0)),
    image: i.productImage ?? null,
  }))

  const viewModel: OrderDetailViewModel = {
    id: dbOrder.id,
    date: dbOrder.createdAt
      ? new Date(dbOrder.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—",
    price: formatINR(total),
    status: formatStatus(dbOrder.status ?? undefined),
    customerName: profile.fullName?.trim() || "—",
    customerPhone: profile.phone?.trim() || "",
    customerEmail: profile.email?.trim() || "",
    shippingAddress: formatShippingAddress(dbOrder),
    paymentMethodLabel: formatPaymentMethod(dbOrder.payment?.paymentMethod ?? undefined),
    paymentRef: dbOrder.payment?.paymentId ?? null,
    lineItems,
    subtotalFormatted,
    discountFormatted,
    couponCode,
    taxFormatted,
  }

  return (
    <div>
      <OrderDetails order={viewModel} />
    </div>
  )
}
