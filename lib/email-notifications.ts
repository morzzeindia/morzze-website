import "server-only";

import { getBaseUrl, sendTemplateEmail } from "@/lib/email";

export async function notifyWelcomeEmail({
  email,
  customerName,
}: {
  email: string;
  customerName: string;
}) {
  return sendTemplateEmail({
    to: email,
    subject: "Welcome To Morzze - Your Account is Ready!",
    template: "welcome",
    type: "user",
    data: {
      "Customer First Name": customerName,
    },
  });
}

export async function notifyOrderConfirmationEmail({
  email,
  customerName,
  orderId,
  orderDate,
  productNames,
  orderTotal,
}: {
  email: string;
  customerName: string;
  orderId: string;
  orderDate: string;
  productNames?: string;
  orderTotal: string | number;
}) {
  return sendTemplateEmail({
    to: email,
    subject: "Your Morzze Order Confirmation",
    template: "order",
    type: "user",
    data: {
      "Customer First Name": customerName,
      "Order ID": orderId,
      "Order Date": orderDate,
      "Product Names": productNames,
      "Order Total": orderTotal,
    },
  });
}

export async function notifyFirstOrderEmail({
  email,
  customerName,
}: {
  email: string;
  customerName: string;
}) {
  return sendTemplateEmail({
    to: email,
    subject: "Welcome to Morzze! Your First Purchase Gift Awaits You",
    template: "first-order",
    type: "user",
    data: {
      "Customer First Name": customerName,
    },
  });
}

export async function notifyOrderShippedEmail({
  email,
  customerName,
  orderId,
  courierName,
  trackingNumber,
  trackingLink,
}: {
  email: string;
  customerName: string;
  orderId: string;
  courierName?: string;
  trackingNumber?: string;
  trackingLink?: string;
}) {
  return sendTemplateEmail({
    to: email,
    subject: "Shipping Confirmation",
    template: "order-shipped",
    type: "user",
    data: {
      "Customer First Name": customerName,
      "Order ID": orderId,
      "Courier Name": courierName || "Our courier partner",
      "Tracking Number": trackingNumber || "Will be shared soon",
      "Tracking Link": trackingLink || "Will be shared soon",
    },
  });
}

export async function notifyOrderDeliveredEmail({
  email,
  customerName,
  orderId,
  deliveryDate,
}: {
  email: string;
  customerName: string;
  orderId: string;
  deliveryDate: string;
}) {
  const baseUrl = getBaseUrl();

  return sendTemplateEmail({
    to: email,
    subject: "Delivery Confirmation",
    template: "order-delivered",
    type: "user",
    data: {
      "Customer First Name": customerName,
      "Order ID": orderId,
      "Delivery Date": deliveryDate,
      "Review Link": `${baseUrl}/dashboard/reviews`,
    },
  });
}

export async function notifyNewsletterSignupEmail({ email }: { email: string }) {
  const baseUrl = getBaseUrl();

  return sendTemplateEmail({
    to: email,
    subject: "Morzze Newsletter: Your Guide to Timeless Kitchens & Bathrooms",
    template: "newsletter",
    type: "user",
    data: {
      "Customer First Name": email.split("@")[0],
      "Shop Link": `${baseUrl}/products`,
      "Subscription Link": `${baseUrl}/subscribe`,
    },
  });
}

export async function notifyUserExperienceEmail({
  email,
  customerName,
  reviewLink,
}: {
  email: string;
  customerName: string;
  reviewLink?: string;
}) {
  const baseUrl = getBaseUrl();

  return sendTemplateEmail({
    to: email,
    subject: "How Was Your Experience with Morzze? We'd Love to Hear from You!",
    template: "user-experience",
    type: "user",
    data: {
      "Customer First Name": customerName,
      "Review Link": reviewLink || `${baseUrl}/dashboard/reviews`,
    },
  });
}
