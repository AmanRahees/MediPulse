export const upcomingDays = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i + 1);
    currentDate.setHours(0, 0, 0, 0);
    dates.push(currentDate);
  }
  return dates;
};
