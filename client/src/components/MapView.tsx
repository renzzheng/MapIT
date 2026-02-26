"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MapViewProps {
  points: { lat: number; lng: number }[];
}

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "16px",
  overflow: "hidden",
};

export default function MapView({ points }: MapViewProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded || points.length === 0) return null;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={points[0]} zoom={10} options={{ disableDefaultUI: true, zoomControl: true }}>
      {points.map((pt, i) => <Marker key={i} position={pt} />)}
    </GoogleMap>
  );
}