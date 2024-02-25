export const pyDateFormatter = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};
