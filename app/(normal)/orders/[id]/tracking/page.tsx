"use client";

import React, { useEffect, useState } from "react";

interface TrackingEvent {
    date: string;
    status: string;
    description: string;
    location?: string;
}

export default function TrackingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: orderId } = React.use(params);
    const [order, setOrder] = useState<any>(null);
    const [trackingData, setTrackingData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const orderRes = await fetch(`/api/orders/${orderId}`);
            const orderData = await orderRes.json();

            setOrder(orderData);

            if (orderData?.trackingNumber) {
                fetchTracking(orderData.trackingNumber);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchTracking = async (trackingNumber: string) => {
        try {
            const res = await fetch(
                `/api/shipping/track/${trackingNumber}`
            );

            const data = await res.json();

            setTrackingData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-lg">
                Loading tracking details...
            </div>
        );
    }

    return (
       <section  className="w-full bg-black">
         <div className="max-w-4xl mx-auto p-6 text-white">
            {/* HEADER */}

            <div className="border rounded-2xl p-6 shadow-sm mb-6 bg-[#171717]">
                <h1 className="text-3xl font-bold mb-2">
                    Order Tracking
                </h1>

                <p className="text-gray-500">
                    Track your shipment in real-time
                </p>
            </div>

            {/* ORDER DETAILS */}

            <div className="border rounded-2xl p-6 mb-6 bg-[#171717]">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">
                            Tracking Number
                        </p>

                        <p className="font-semibold">
                            {order?.trackingNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Courier
                        </p>

                        <p className="font-semibold">
                            {order?.courierName || "Envia"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Shipping Status
                        </p>

                        <p className="font-semibold capitalize text-green-600">
                            {order?.shippingStatus}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Estimated Delivery
                        </p>

                        <p className="font-semibold">
                            {order?.estimatedDeliveryDate
                                ? new Date(
                                    order.estimatedDeliveryDate
                                ).toLocaleDateString()
                                : "Updating"}
                        </p>
                    </div>
                </div>
            </div>

            {/* TIMELINE */}

            <div className="border rounded-2xl p-6 bg-[#171717]">
                <h2 className="text-2xl font-semibold mb-6">
                    Shipment Timeline
                </h2>

                <div className="space-y-6">
                    {trackingData?.events?.length > 0 ? (
                        trackingData.events.map(
                            (event: TrackingEvent, index: number) => (
                                <div
                                    key={index}
                                    className="flex gap-4"
                                >
                                    {/* DOT */}

                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-black" />

                                        {index !==
                                            trackingData.events.length - 1 && (
                                                <div className="w-[2px] h-full bg-gray-300" />
                                            )}
                                    </div>

                                    {/* CONTENT */}

                                    <div className="pb-8">
                                        <p className="font-semibold">
                                            {event.status}
                                        </p>

                                        <p className="text-gray-600 text-sm">
                                            {event.description}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {event.location}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {new Date(
                                                event.date
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <div className="text-gray-500">
                            Tracking updates not available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
       </section>
    );
}