import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address || address.trim().length === 0) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const addressList: string[] = address
      .split("\n")
      .map((a: string) => a.trim())
      .filter((a: string) => a.length > 0);

    const results = [];

    for (const addr of addressList) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addr)}&key=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data.results;

      if (data && data.length > 0) {
        const location = data[0].geometry.location;
        results.push({ address: addr, lat: location.lat, lng: location.lng });
      } else {
        results.push({ address: addr, error: "No results found" });
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Geocoding error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}