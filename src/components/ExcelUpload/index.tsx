"use client";
import { formatPrimarySkills } from "@/lib/functions";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {};

const ExcelUpload = (props: Props) => {
  const [uploadType, setUploadType] = useState<
    "onBenchEmployee" | "jobRequirement"
  >("onBenchEmployee");
  const [onBenchEmployee, setOnBenchEmployee] = useState([]);
  const [jobRequirement, setJobRequirement] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("====================================");
  console.log("onBenchEmployee", onBenchEmployee);
  console.log("====================================");
  console.log("====================================");
  console.log("jobRequirement", jobRequirement);
  console.log("====================================");
  const onSubmit = async (data: FieldValues) => {
    console.log("====================================");
    console.log("Form Data:", data);
    console.log("====================================");

    const formData = new FormData();
    formData.append("file", data.excelFile[0]); // Extract the file

    try {
      const response = await fetch("http://localhost:3000/api/excelToJson", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("====================================");
      console.log("result", result);
      console.log("====================================");
      if (uploadType === "onBenchEmployee") {
        const formatOnBenchEmployee = formatPrimarySkills(result);
        setOnBenchEmployee(formatOnBenchEmployee as any);
      }
      setJobRequirement(result["Open JR"]);
      // setJobRequirement(Object.values(result)[1]);
    } catch (error: any) {
      console.error("Error uploading the file:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="file"
          accept=".xlsx"
          {...register("excelFile", { required: true })}
        />
        {errors.excelFile && <p>Please upload an Excel file.</p>}
      </div>
      <div className="flex flex-col">
        <label>
          <input
            type="radio"
            value="onBenchEmployee"
            checked={uploadType === "onBenchEmployee"}
            onChange={() => setUploadType("onBenchEmployee")}
          />
          Upload On Bench Employee Data
        </label>
        <label>
          <input
            type="radio"
            value="jobRequirement"
            checked={uploadType === "jobRequirement"}
            onChange={() => setUploadType("jobRequirement")}
          />
          Upload Job Requirement Data
        </label>
      </div>

      <button type="submit">Upload and Convert</button>
    </form>
  );
};

export default ExcelUpload;
