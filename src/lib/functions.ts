export const formatPrimarySkills = (result: any) => {
  const mergedData: any[] = [];
  const empMap = new Map();
  const key = Object.keys(result)[0];

  result[key].forEach((item: Record<string, any>) => {
    if (item.EmpID) {
      if (!empMap.has(item.EmpID)) {
        // Initialize 'Primary Skills ' as an array if it's not already
        empMap.set(item.EmpID, {
          ...item,
          "Primary Skills ": item["Primary Skills "]
            ? [item["Primary Skills "]]
            : [],
        });
      }
    } else if (item["Primary Skills "]) {
      // Add to the Primary Skills array of the last employee
      const lastEmp = Array.from(empMap.values()).pop();
      if (lastEmp) {
        lastEmp["Primary Skills "].push(item["Primary Skills "]);
      }
    }
  });

  empMap.forEach((emp) => mergedData.push(emp));

  return mergedData;
};
