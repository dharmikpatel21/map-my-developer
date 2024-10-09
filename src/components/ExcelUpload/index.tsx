"use client";
import { formatPrimarySkills } from "@/lib/functions";
import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { UploadIcon } from "@radix-ui/react-icons";

type Props = {
  setParsedJobRequirement: React.Dispatch<
    React.SetStateAction<Record<string, any>[]>
  >;
  setParsedOnBenchEmployee: React.Dispatch<
    React.SetStateAction<Record<string, any>[]>
  >;
};

const ExcelUpload = ({
  setParsedJobRequirement,
  setParsedOnBenchEmployee,
}: Props) => {
  const [uploadType, setUploadType] = useState<
    "onBenchEmployee" | "jobRequirement"
  >("onBenchEmployee");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const fileName = watch("excelFile")?.[0]?.name;

  const handleExcelSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append("file", data.excelFile[0]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/excelToJson`,
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      if (response.ok) {
        toast({
          variant: "success",
          title: "Excel Upload",
          description: "Excel uploaded successfully",
        });
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const firstExcelFileKey = Object.keys(result)[0];
      const firstObectInData = result[firstExcelFileKey][0];

      if (result.length > 0) {
        toast({
          variant: "destructive",
          title: "Excel Data Parsing",
          description: "only one excel is allowed",
        });
      }

      if (uploadType === "onBenchEmployee") {
        const formatOnBenchEmployee = formatPrimarySkills(result);

        const isOnBenchEmployeeExcel = "EmpID" in firstObectInData;

        if (!isOnBenchEmployeeExcel) {
          toast({
            variant: "destructive",
            description: "upload valid excel file",
          });
          return;
        }
        sessionStorage.setItem(
          "onBenchEmployee",
          JSON.stringify(formatOnBenchEmployee)
        );
        setParsedOnBenchEmployee(formatOnBenchEmployee);
        setUploadType("jobRequirement");
      }
      if (uploadType === "jobRequirement") {
        const isJobRequirementExcel = "JR" in firstObectInData;

        if (!isJobRequirementExcel) {
          toast({
            variant: "destructive",
            description: "upload valid excel file",
          });
          return;
        }
        sessionStorage.setItem(
          "jobRequirement",
          JSON.stringify(result[firstExcelFileKey])
        );
        setParsedJobRequirement(result[firstExcelFileKey]);
      }
    } catch (error: any) {
      console.error("failed to upload the file:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: `failed to upload the file: ${error.message}`,
      });
    } finally {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {uploadType === "onBenchEmployee" && (
        <form
          onSubmit={handleSubmit(handleExcelSubmit)}
          className="flex flex-col gap-4"
        >
          <h3>Upload the excel file for onBenchEmployees</h3>
          <label className="flex flex-col items-center justify-center border-2 py-5  border-dashed rounded-sm cursor-pointer bg-gray-50">
            <div className="flex flex-col gap-6 items-center justify-center">
              <UploadIcon className="w-6 aspect-square" />
              <p className="font-semibold">Click to upload your excel</p>
              {fileName && <p>{fileName}</p>}{" "}
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx"
              {...register("excelFile", { required: true })}
            />
          </label>
          {errors.excelFile && (
            <p className="text-rose-400">Please upload an Excel file.</p>
          )}
          <Button type="submit">Upload</Button>
        </form>
      )}

      {uploadType === "jobRequirement" && (
        <form
          onSubmit={handleSubmit(handleExcelSubmit)}
          className="flex flex-col gap-4"
        >
          <h3>Upload the excel file for jobRequirement </h3>
          <label className="flex flex-col items-center justify-center border-2 py-5  border-dashed rounded-sm cursor-pointer bg-gray-50">
            <div className="flex flex-col gap-6 items-center justify-center">
              <UploadIcon className="w-6 aspect-square" />
              <p className="font-semibold">Click to upload your excel</p>
              {fileName && <p>{fileName}</p>}{" "}
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx"
              {...register("excelFile", { required: true })}
            />
          </label>
          {errors.excelFile && (
            <p className="text-rose-400">Please upload an Excel file.</p>
          )}
          <Button type="submit">Submit Job Requirement Data</Button>
        </form>
      )}
    </div>
  );
};

export default ExcelUpload;

//   formData.append("file", data.excelFile[0]);
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/excelToJson`,
//       {
//         method: "POST",
//         body: formData,
//         mode: "no-cors",
//       }
//     );
//     if (response.ok) {
//       toast({
//         title: "onBenchEmployee",
//         description: "Excel uploaded successfully",
//       });
//     }
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     const formatOnBenchEmployee = formatPrimarySkills(result);
//     sessionStorage.setItem(
//       "onBenchEmployee",
//       JSON.stringify(formatOnBenchEmployee)
//     );
//     setParsedOnBenchEmployee(formatOnBenchEmployee);
//     toast({
//       title: "Excel upload status",
//       description: "Excel uploaded successfully",
//     });
//   } catch (error: any) {
//     console.error("Error uploading the file:", error.message);
//   } finally {
//     setUploadType("jobRequirement");
//   }
// };

// const handleJobRequirementSubmit = async (data: FieldValues) => {
//   const formData = new FormData();
//   formData.append("file", data.excelFile[0]);
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/excelToJson`,
//       {
//         method: "POST",
//         body: formData,
//         mode: "no-cors",
//       }
//     );

//     if (response.ok) {
//       toast({
//         title: "jobRequirement",
//         description: "Excel uploaded successfully",
//       });
//     }
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     sessionStorage.setItem(
//       "jobRequirement",
//       JSON.stringify(result["Open JR"])
//     );
//     setParsedJobRequirement(result["Open JR"]);
//   } catch (error: any) {
//     console.error("Error uploading the file:", error.message);
//   }
// };
