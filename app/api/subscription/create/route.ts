import { db } from "@/db"
import { order } from "@/db/schema"
import { subscriptions } from "@/db/schema"
import { requireUserWithRefresh } from "@/helper/user/action"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { planId } = await req.json()
    const { userId } = await requireUserWithRefresh()

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plan = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, planId)
    })

    if (!plan || !plan.frequencyInMonths) {
      return Response.json({ error: "Plan not found or invalid" })
    }

    const startDate = new Date()

    const nextBillingDate = new Date()
    nextBillingDate.setMonth(
      nextBillingDate.getMonth() + plan.frequencyInMonths
    )

    const newSubscription = await db
      .insert(subscriptions)
      .values({
        userId,
        // planId,
        startDate,
        nextOrderDate: nextBillingDate,
        status: "active"
      })
      .returning()

    await db.insert(order).values({
      userId,
      subscriptionId: newSubscription[0].id,
      // totalAmountPaid: plan.price,
      status: "paid",
      createdAt: new Date()
    })

    return Response.json({
      message: "Subscription created"
    })
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.error("Subscription create error:", error)
    return Response.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
