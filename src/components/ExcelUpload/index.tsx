"use client";
import { formatPrimarySkills } from "@/lib/functions";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { UploadIcon } from "@radix-ui/react-icons";

type Props = {};

const ExcelUpload = (props: Props) => {
  const [uploadType, setUploadType] = useState<
    "onBenchEmployee" | "jobRequirement"
  >("onBenchEmployee");
  // const [onBenchEmployee, setOnBenchEmployee] = useState([]);
  // const [jobRequirement, setJobRequirement] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        sessionStorage.setItem(
          "onBenchEmployee",
          JSON.stringify(formatOnBenchEmployee)
        );
      }
      sessionStorage.setItem(
        "jobRequirement",
        JSON.stringify(result["Open JR"] ? result["Open JR"] : [])
      );
    } catch (error: any) {
      console.error("Error uploading the file:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            type="file"
            accept=".xlsx"
            {...register("excelFile", { required: true })}
            className="cursor-pointer"
          />
          {errors.excelFile && (
            <p className="text-rose-400">Please upload an Excel file.</p>
          )}
        </div>

        {/* <div className="flex flex-col">
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
      </div> */}
        <RadioGroup
          value={uploadType}
          onValueChange={(value) =>
            setUploadType(value as "onBenchEmployee" | "jobRequirement")
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onBenchEmployee" id="onBenchEmployee" />
            <Label htmlFor="onBenchEmployee">
              Upload On Bench Employee Data
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="jobRequirement" id="jobRequirement" />
            <Label htmlFor="jobRequirement">Upload Job Requirement Data</Label>
          </div>
        </RadioGroup>
        {/* <button>Upload and Convert</button> */}
        <Button type="submit">Upload and Convert</Button>
      </form>
    </div>
  );
};

export default ExcelUpload;
