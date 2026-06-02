"use server";
import { paymentGatewayPlans, paymentGatewaySubscription, subscriptions } from "@/db/schema";
import { db } from "@/lib/db";
import { requireUserWithRefresh } from "../user/action";

type SubscriptionItemInput = {
  frequencyInMonths: number;
};

type PaymentGatewayPlanInput = {
  id: string;
  interval: number;
  period: string;
  item: {
    name: string;
    amount: number;
    description?: string;
  };
};

type PaymentGatewaySubscriptionInput = {
  plan_id: string;
  total_count: number;
  remaining_count: number;
  quantity: number;
  start_at?: number;
  customer_notify: boolean;
  expire_by?: number;
  short_url: string;
};

function fromUnixSeconds(value?: number) {
  return value ? new Date(value * 1000) : null;
}

export async function createSubscription({
  items,
}: {
  items: SubscriptionItemInput[];
}) {
  try {
    const { userId } = await requireUserWithRefresh();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await db.insert(subscriptions).values(
      items.map((item) => {
        const startDate = new Date();

        // 1 month = 30 days
        const totalDays = item.frequencyInMonths * 30;

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        const nextOrderDate = new Date(endDate);
        nextOrderDate.setDate(nextOrderDate.getDate() + 1);

        return {
          userId,
          frequencyInMonths: item.frequencyInMonths,
          startDate,
          endDate,
          nextOrderDate,
        };
      }),
    );

    return {
      success: true,
      message: "Subscription created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create subscription",
    };
  }
}

export async function createPaymentGatewayPlan(planData: PaymentGatewayPlanInput[]) {
  try {
    await db.insert(paymentGatewayPlans).values(
      planData.map((item) => {
        return {
          name: item.item.name,
          price: item.item.amount,
          descirption: item.item.description,
          billingFrequency: String(item.interval),
          frequencyType: item.period,
          planId: item.id,
        };
      }),
    );

    return {
      success: true,
      message: "Payment gateway plan created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create payment gateway plan",
    };
  }
}


export async function CreatePaymentGatewaySubscription(subscriptions: PaymentGatewaySubscriptionInput[]){
    try {
        await db.insert(paymentGatewaySubscription).values(
            subscriptions.map((item) => {
                return {
                    planId: item.plan_id,
                    totalCount: item.total_count,
                    remainingCount:item.remaining_count,
                    quantity: item.quantity,
                    startAt: fromUnixSeconds(item.start_at),
                    customerNotify: item.customer_notify,
                    expireBy: fromUnixSeconds(item.expire_by),
                    shourURL: item.short_url,
                    // startDate: item.start_date,
                };
            })
        );
        
    } catch {
        
    }
}
