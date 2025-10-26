import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MapViewProps {
  points: { lat: number; lng: number }[];
}

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "16px",
  overflow: "hidden"
};
  
const MapView = ({ points }: MapViewProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded || points.length === 0) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={points[0]} // center on first result
      zoom={10}
      options={{
        disableDefaultUI: true, // removes clutter
        zoomControl: true
        }}
    >
      {points.map((pt, i) => (
        <Marker key={i} position={pt} />
      ))}
    </GoogleMap>
  );
};

export default MapView;
