"use server";

import {
  notifyFirstOrderEmail,
  notifyOrderConfirmationEmail,
  notifyOrderShippedEmail,
  notifyUserExperienceEmail,
  notifyWelcomeEmail,
} from "@/lib/email-notifications";
import { sendTemplateEmail } from "@/lib/email";

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  orderDate: string,
  amount: string | number,
) {
  try {
    const result = await notifyOrderConfirmationEmail({
      email,
      customerName: firstName,
      orderId,
      orderDate,
      orderTotal: amount,
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendFirstPurchaseEmail(email: string, firstName: string) {
  try {
    const result = await notifyFirstOrderEmail({
      email,
      customerName: firstName,
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterEmail(
  email: string,
  firstName: string,
  shopLink: string,
  subscriptionLink: string = "https://www.morzze.com/subscribe",
) {
  try {
    const result = await sendTemplateEmail({
      to: email,
      subject: "Morzze Newsletter: Your Guide to Timeless Kitchens & Bathrooms",
      template: "newsletter",
      type: "user",
      data: {
        "Customer First Name": firstName,
        "Shop Link": shopLink,
        "Subscription Link": subscriptionLink,
      },
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendUserExperienceEmail(
  email: string,
  firstName: string,
  reviewLink: string,
) {
  try {
    const result = await notifyUserExperienceEmail({
      email,
      customerName: firstName,
      reviewLink,
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendShippingConfirmationEmail(
  email: string,
  orderId: string,
  firstName: string,
  trackingUrl: string,
  courierName: string,
) {
  try {
    const result = await notifyOrderShippedEmail({
      email,
      customerName: firstName,
      orderId,
      courierName,
      trackingLink: trackingUrl,
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendDeliveryConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  deliveryDate: string,
  reviewLink: string,
) {
  try {
    const result = await sendTemplateEmail({
      to: email,
      subject: "Delivery Confirmation",
      template: "order-delivered",
      type: "user",
      data: {
        "Customer First Name": firstName,
        "Order ID": orderId,
        "Delivery Date": deliveryDate,
        "Review Link": reviewLink,
      },
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const result = await notifyWelcomeEmail({
      email,
      customerName: name,
    });

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}
