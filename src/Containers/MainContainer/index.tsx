"use client";
import ExcelUpload from "@/components/ExcelUpload";
import SelectJob from "@/components/SelectJob";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const MapWithEmployeeMarkers = dynamic(
  () => import("@/components/MapWithEmployeeMarkers"),
  { ssr: false }
);
type Props = {};

const MainContainer = (props: Props) => {
  const [locationCoordinates, setLocationCoordinates] = useState<
    Record<string, any>[]
  >([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <ExcelUpload />
      <SelectJob
        setLocationCoordinates={setLocationCoordinates}
        setLoading={setLoading}
      />
      <MapWithEmployeeMarkers
        locationCoordinates={locationCoordinates}
        loading={loading}
      />
    </div>
  );
};

export default MainContainer;
