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
  const [empDataWithCoordinates, setEmpDataWithCoordinates] = useState<
    Record<string, any>[]
  >([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <ExcelUpload />
      <SelectJob
        setEmpDataWithCoordinates={setEmpDataWithCoordinates}
        setLoading={setLoading}
      />
      <MapWithEmployeeMarkers
        empDataWithCoordinates={empDataWithCoordinates}
        loading={loading}
      />
    </div>
  );
};

export default MainContainer;
