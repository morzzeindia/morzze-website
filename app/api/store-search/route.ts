import { NextResponse } from "next/server";

const stores = [
    {
        store_name: "Jaipur Store",
        city: "Jaipur",
        latitude: 26.9124,
        longitude: 75.7873,
    },
    {
        store_name: "Delhi Store",
        city: "Delhi",
        latitude: 28.7041,
        longitude: 77.1025,
    },
];

function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");

    // Get coordinates from Google Geocoding API
    const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const geoData = await geoRes.json();

    const userLat = geoData.results[0].geometry.location.lat;
    const userLng = geoData.results[0].geometry.location.lng;

    // Calculate distances
    const nearestStores = stores
        .map((store) => ({
            ...store,
            distance: calculateDistance(
                userLat,
                userLng,
                store.latitude,
                store.longitude
            ).toFixed(2),
        }))
        .sort((a, b) => Number(a.distance) - Number(b.distance));

    return NextResponse.json({
        stores: nearestStores.slice(0, 5),
    });
}