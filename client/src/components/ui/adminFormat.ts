export const formatValue = (value: unknown) => {
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "The request could not be completed.";
