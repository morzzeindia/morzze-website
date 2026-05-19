import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ trackingNumber: string }> }
) {
    try {
        const { trackingNumber } = await params;

        const response = await fetch(
            `https://queries.envia.com/track/${trackingNumber}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.ENVIA_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Tracking fetch failed",
            },
            { status: 500 }
        );
    }
}