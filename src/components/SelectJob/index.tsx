"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {};

const SelectJob = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const [parsedJobRequirement, setParsedJobRequirement] = useState<
    Record<string, any>[] | null
  >(null);

  useEffect(() => {
    const storedJobRequirement = sessionStorage.getItem("jobRequirement");
    if (storedJobRequirement) {
      setParsedJobRequirement(JSON.parse(storedJobRequirement));
    }
  }, []);

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
