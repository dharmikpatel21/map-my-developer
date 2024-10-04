"use client";
import { formatPrimarySkills } from "@/lib/functions";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {};

const ExcelUpload = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log("Form Data:", data);

    const formData = new FormData();
    formData.append("file", data.excelFile[0]); // Extract the file

    try {
      const response = await fetch("http://localhost:3000/api/excelToJson", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      const formatedData = formatPrimarySkills(result);
      console.log("formatedData", formatedData);
      console.log("Converted JSON data:", result);
    } catch (error) {
      console.error("Error uploading the file:", error);
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
      <button type="submit">Upload and Convert</button>
    </form>
  );
};

export default ExcelUpload;
