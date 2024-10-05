"use client";
import { getEmployeesFromSkills } from "@/lib/functions";
import { getSkillsfromJobTitle } from "@/lib/getSkillsfromJobTitle";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {};

const SelectJob = (props: Props) => {
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
    const selectedJob = data.selectJob;
    const skills = await getSkillsfromJobTitle(selectedJob);
    const matchingEmployees =
      skills &&
      parsedOnBenchEmployee &&
      (await getEmployeesFromSkills({
        skills,
        parsedOnBenchEmployee,
      }));
    const empIDs = matchingEmployees.map(
      (employee: Record<string, any>) => employee.Location
    );
    console.log("Matching EmpIDs:", empIDs);
  };

  return (
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
  );
};

export default SelectJob;
