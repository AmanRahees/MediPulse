export const formatDate = (input) => {
  let date = new Date(input);
  let options = { day: "numeric", month: "short", year: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatLongDate = (input) => {
  let date = new Date(input);
  let options = { day: "numeric", month: "long", year: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const getYear = (input) => {
  let date = new Date(input);
  let year = date.getFullYear();
  return year;
};

export const getWeekDay = (input) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(input);
  return daysOfWeek[date.getDay()];
};

export const getShortWeekDay = (input) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(input);
  return daysOfWeek[date.getDay()];
};

export const calculateDaysAgo = (input) => {
  const inputDate = new Date(input);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  if (daysDifference === 0) {
    return `Today`;
  } else if (daysDifference === 1) {
    return `Yesterday`;
  }
  return `${daysDifference} days ago`;
};

export const formatDateWithoutYear = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${day} ${month}.`;
};

export const totalYears = (fromDate, toDate = new Date()) => {
  var fromYear = new Date(fromDate).getFullYear();
  var fromMonth = new Date(fromDate).getMonth();
  var toYear = new Date(toDate).getFullYear();
  var toMonth = new Date(toDate).getMonth();

  var yearsDiff = toYear - fromYear;
  var monthsDiff = toMonth - fromMonth;

  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }

  if (yearsDiff === 0 && monthsDiff === 0) {
    return "New";
  } else if (yearsDiff === 0) {
    return `${monthsDiff} mo`;
  } else if (monthsDiff === 0) {
    return `${yearsDiff} yr`;
  } else {
    return `${yearsDiff} yr ${monthsDiff} mo`;
  }
};
