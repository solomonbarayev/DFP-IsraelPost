interface Data {
  [key: string]: any;
}

export const downloadCSV = (data: Data[], filename = "data.csv") => {
  const csv = convertToCSV(data);
  const bom = "\ufeff"; // To ensure UTF-8 encoding
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  link.click();
};


const convertToCSV = (data: Data[]) => {
  const header = Object.keys(data[0]);
  const rows = data.map((item) =>
    header.map((fieldName) => JSON.stringify(item[fieldName], (key, value) => value ?? "")).join(",")
  );
  return [header.join(","), ...rows].join("\n");
};