export const formatTime = (time) => {
  const parsedTime = new Date("2000-01-01T" + time);
  const hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();
  const formattedHours = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
};
