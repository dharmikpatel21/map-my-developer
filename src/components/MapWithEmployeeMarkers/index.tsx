"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
type Props = {
  locationCoordinates: Record<string, any>[];
  loading: boolean;
};

// interface Employee {
//   name: string;
//   dob: string;
//   city: string;
//   state: string;
//   country: string;
//   role: string;
//   experience: string;
//   skills: string[];
//   salaryExpectation: string;
//   workStatus: string;
//   coordinates: [number, number];
// }

// const employees: Employee[] = [
//   {
//     name: "Arjun Patel",
//     dob: "1990-03-15",
//     city: "Ahmedabad",
//     state: "Gujarat",
//     country: "India",
//     role: "Full-Stack Developer",
//     experience: "8 years",
//     skills: ["JavaScript", "React", "Node.js", "MongoDB"],
//     salaryExpectation: "₹1,500,000/year",
//     workStatus: "Actively looking",
//     coordinates: [23.0225, 72.5714],
//   },
//   {
//     name: "Sophia Martinez",
//     dob: "1988-06-10",
//     city: "Barcelona",
//     state: "Catalonia",
//     country: "Spain",
//     role: "Backend Developer",
//     experience: "10 years",
//     skills: ["Python", "Django", "PostgreSQL", "Docker"],
//     salaryExpectation: "€60,000/year",
//     workStatus: "Currently employed",
//     coordinates: [41.3851, 2.1734],
//   },
//   {
//     name: "Emily Chen",
//     dob: "1992-11-05",
//     city: "Beijing",
//     state: "Beijing",
//     country: "China",
//     role: "Frontend Developer",
//     experience: "6 years",
//     skills: ["HTML", "CSS", "Vue.js", "Sass"],
//     salaryExpectation: "¥300,000/year",
//     workStatus: "Freelancing",
//     coordinates: [39.9042, 116.4074],
//   },
//   {
//     name: "James Brown",
//     dob: "1985-02-20",
//     city: "San Francisco",
//     state: "California",
//     country: "USA",
//     role: "DevOps Engineer",
//     experience: "12 years",
//     skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
//     salaryExpectation: "$120,000/year",
//     workStatus: "Currently employed",
//     coordinates: [37.7749, -122.4194],
//   },
//   {
//     name: "Olga Ivanova",
//     dob: "1993-09-12",
//     city: "Moscow",
//     state: "Moscow",
//     country: "Russia",
//     role: "Mobile App Developer",
//     experience: "7 years",
//     skills: ["Kotlin", "Swift", "Flutter", "React Native"],
//     salaryExpectation: "₽1,500,000/year",
//     workStatus: "Actively looking",
//     coordinates: [55.7558, 37.6173],
//   },
// ];

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWithEmployeeMarkers = ({ locationCoordinates, loading }: Props) => {
  const groupCoordinates = (locationCoordinates: Record<string, any>[]) => {
    const grouped = locationCoordinates.reduce((acc, coordinate) => {
      const key = coordinate.place_id;
      if (!acc[key]) {
        acc[key] = { ...coordinate, count: 1 };
      } else {
        acc[key].count += 1;
      }
      return acc;
    }, {});

    return Object.values(grouped);
  };
  const groupedCoordinates = groupCoordinates(locationCoordinates);
  return (
    <div className="relative h-100vh w-100vw">
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-30 flex justify-center items-center z-10">
          <div className="text-red-500 font-bold text-2xl">Loading...</div>
        </div>
      ) : (
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={2}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {groupedCoordinates.map((coordinate, index) => {
            const position = {
              lat: parseFloat(coordinate.lat),
              lng: parseFloat(coordinate.lon),
            };
            return (
              <Marker key={index} position={position} icon={DefaultIcon}>
                <Popup>
                  {" "}
                  {coordinate.count > 1
                    ? `${coordinate.count} occurrences at this location`
                    : `1 occurrence at this location`}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default MapWithEmployeeMarkers;
