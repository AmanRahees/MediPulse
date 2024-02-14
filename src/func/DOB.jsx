export const stringDOB = (DOB) => {
  let dobDate = new Date(DOB);
  let options = { day: "2-digit", month: "long", year: "numeric" };
  return dobDate.toLocaleDateString("en-US", options);
};

export const getAge = (DOB) => {
  let dobDate = new Date(DOB);
  let currentDate = new Date();
  let age = currentDate.getFullYear() - dobDate.getFullYear();
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  if (age < 1) {
    return "Infant";
  } else {
    return age + " years";
  }
};
