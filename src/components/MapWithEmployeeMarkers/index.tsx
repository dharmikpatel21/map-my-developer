"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Spinner from "../Spinner";

type Props = {
  empDataWithCoordinates: Record<string, any>[];
  loading: boolean;
};

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWithEmployeeMarkers = ({ empDataWithCoordinates, loading }: Props) => {
  console.log("====================================");
  console.log("locationCoordinates", empDataWithCoordinates);
  console.log("====================================");

  // Create a Set to track unique coordinates
  const uniqueCoordinates = new Set<string>();

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        empDataWithCoordinates.length > 0 && (
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={2}
            style={{ height: 500, width: 500 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {empDataWithCoordinates.map((employee, index) => {
              const lat = parseFloat(employee.coordinates.lat);
              const lng = parseFloat(employee.coordinates.lon);
              const position = `${lat},${lng}`;

              if (uniqueCoordinates.has(position)) {
                return null;
              }
              uniqueCoordinates.add(position);

              const employeeCount = empDataWithCoordinates.filter(
                (emp) =>
                  parseFloat(emp.coordinates.lat) === lat &&
                  parseFloat(emp.coordinates.lon) === lng
              ).length;

              return (
                <Marker
                  key={position}
                  position={{ lat, lng }}
                  icon={DefaultIcon}
                >
                  <Popup className="overflow-scroll">
                    <div className="flex flex-col">
                      <p>Number of Employees: {employeeCount}</p>{" "}
                      {empDataWithCoordinates
                        .filter(
                          (emp) =>
                            parseFloat(emp.coordinates.lat) === lat &&
                            parseFloat(emp.coordinates.lon) === lng
                        )
                        .map((emp) => (
                          <div key={emp.EmpID}>
                            {/* <p>AccountSPOC: {emp.AccountSPOC}</p> */}
                            <p>Designation: {emp.Designation}</p>
                            <p>EmpID: {emp.EmpID}</p>
                            <p>EmpName: {emp.EmpName}</p>
                            {/* <p>Experience: {emp.Experience}</p> */}
                            {/* <p>PhoneNo: {emp.PhoneNo}</p> */}
                            <p>Skills: {emp.Skills}</p>
                            <p>Primary Skills: {emp["Primary Skills "]}</p>
                            {/* <p>Resource Status: {emp["Resource Status"]}</p> */}
                            {/* <p>Location: {emp.Location}</p> */}
                            <p>
                              Latitude and Longitude: {emp.coordinates.lat},{" "}
                              {emp.coordinates.lon}
                            </p>
                            <hr />{" "}
                          </div>
                        ))}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )
      )}
    </div>
  );
};

export default MapWithEmployeeMarkers;
