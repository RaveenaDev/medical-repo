// utils/doctorHelpers.js
export const validateDoctor = (doctor, isEdit = false) => {
  const newErrors = {};
  Object.keys(doctor).forEach((key) => {
    if (
      (!doctor[key] || String(doctor[key]).trim() === "") &&
      key !== "profile" &&
      key !== "role" &&
      key !== "hospitalName" &&
      key !== "status" &&
      (isEdit ? key !== "department" : true)
    ) {
      newErrors[key] = "This field is required";
    }
  });

  if (doctor.email && !/^\S+@\S+\.\S+$/.test(doctor.email)) {
    newErrors.email = "Enter a valid email";
  }
  if (doctor.phone && !/^\d{10}$/.test(String(doctor.phone))) {
    newErrors.phone = "Enter a valid 10-digit phone number";
  }
  return newErrors;
};

export const truncateText = (text, maxLength = 30) =>
  text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
