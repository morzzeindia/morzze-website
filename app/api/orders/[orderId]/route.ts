import { db } from "@/lib/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;
        if (!orderId) {
            return NextResponse.json(
                {
                    message: "Order ID missing",
                },
                { status: 400 }
            );
        }

        const data = await db.query.order.findFirst({
            where: eq(order.id, orderId),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "Failed to fetch order",
            },
            { status: 500 }
        );
    }
}