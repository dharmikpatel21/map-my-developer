import dynamic from "next/dynamic";
const MapWithEmployeeMarkers = dynamic(
  () => import("@/components/MapWithEmployeeMarkers"),
  { ssr: false }
);
export default function Home() {
  return <MapWithEmployeeMarkers />;
}
