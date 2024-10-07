"use client";
import { getEmployeesFromSkills } from "@/lib/functions";
import { getCoordinates } from "@/lib/getCordinates";
import { getSkillsfromJobTitle } from "@/lib/getSkillsfromJobTitle";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  setEmpDataWithCoordinates: React.Dispatch<
    React.SetStateAction<Record<string, any>[]>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectJob = ({ setEmpDataWithCoordinates, setLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [parsedJobRequirement, setParsedJobRequirement] = useState<
    Record<string, any>[] | null
  >(null);
  const [parsedOnBenchEmployee, setParsedOnBenchEmployee] = useState<
    Record<string, any>[] | null
  >(null);

  useEffect(() => {
    const storedJobRequirement = sessionStorage.getItem("jobRequirement");
    if (storedJobRequirement) {
      setParsedJobRequirement(JSON.parse(storedJobRequirement));
    }
    const storedOnBenchEmployee = sessionStorage.getItem("onBenchEmployee");
    if (storedOnBenchEmployee) {
      setParsedOnBenchEmployee(JSON.parse(storedOnBenchEmployee));
    }
  }, []);

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      const selectedJob = data.selectJob;

      const skills = await getSkillsfromJobTitle(selectedJob);

      if (!skills || !parsedOnBenchEmployee) {
        console.warn("No skills or employee data available.");
        return;
      }

      const matchingEmployees = await getEmployeesFromSkills({
        skills,
        parsedOnBenchEmployee,
      });

      if (!matchingEmployees.length) {
        console.warn("No matching employees found.");
        return;
      }

      // let coordinatesCache: Record<string, any> = {};

      const empLocationWithCoordinates = await Promise.all(
        matchingEmployees.map(async (employee: Record<string, any>) => {
          const location = employee.Location?.toLowerCase().trim();
          if (!location) {
            console.warn(`Employee ${employee.name} has no location.`);
            return null;
          }
          // if (!coordinatesCache[location]) {
          try {
            const coordinates = await getCoordinates(location);
            console.log(`Coordinates for ${location}:`, coordinates);
            return { ...employee, coordinates };
            // coordinatesCache[location] = coordinates;
          } catch (error: any) {
            console.error(
              `Error fetching coordinates for ${employee.Location}:`,
              error.message
            );
            return null;
          }
          // }

          // const coordinates = coordinatesCache[location];
          // return { ...employee, coordinates };
        })
      );

      const empDataWithvalidLocations = empLocationWithCoordinates.filter(
        (loc) => loc !== null
      );
      setEmpDataWithCoordinates(empDataWithvalidLocations);
      console.log("All valid employee coordinates:", empDataWithvalidLocations);
    } catch (error: any) {
      console.error("Error during form submission:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="selectJob">Job Posting Title</label>
          <select id="selectJob" {...register("selectJob", { required: true })}>
            <option value="">Select your Job Posting Title</option>
            {parsedJobRequirement?.map((item: Record<string, any>) => (
              <option key={item["JR"]} value={item["Job Posting Title"]}>
                {item["Job Posting Title"]}
              </option>
            ))}
          </select>
          {errors.selectJob && <p>This field is required</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SelectJob;
