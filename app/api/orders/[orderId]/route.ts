import { db } from "@/lib/db";
import { order } from "@/db/schema";
import { requireUserWithRefresh } from "@/helper/user/action";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;
        const { userId } = await requireUserWithRefresh();


        if (!userId) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        if (!orderId) {
            return NextResponse.json(
                {
                    message: "Order ID missing",
                },
                { status: 400 }
            );
        }

        const data = await db.query.order.findFirst({
            where: and(eq(order.id, orderId), eq(order.userId, userId)),
        });

        if (!data) {
            return NextResponse.json(
                {
                    message: "Order not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: "Failed to fetch order",
            },
            { status: 500 }
        );
    }
}
